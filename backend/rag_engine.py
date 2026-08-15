import os
import traceback

from dotenv import load_dotenv
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

from pdf_loader import (
    list_pdf_files,
    load_pdf
)
from chunker import create_chunks
from vector_store import store_embeddings
from hash_utils import compute_file_hash
from index_registry import (
    is_indexed,
    mark_indexed
)
from conversation_memory import (
    add_message,
    get_history
)
from qdrant_db import get_next_chunk_id
from retriever import retrieve
from session_memory import (
    get_session_memory,
)
from reranker import rerank


# ==========================
# Load environment
# ==========================

base_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(base_dir, ".env")

load_dotenv(dotenv_path)


# ==========================
# Gemini configuration
# ==========================

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


# ==========================
# Load PDFs
# ==========================

print("\nChecking PDFs...")

pdf_files = list_pdf_files()

chunk_id = get_next_chunk_id()

for filename in pdf_files:

    filepath = os.path.join(
        base_dir,
        "docs",
        filename
    )

    file_hash = compute_file_hash(
        filepath
    )

    if is_indexed(file_hash):

        print(
            f"Skipping {filename} (already indexed)"
        )

        continue

    print(
        f"Indexing {filename}"
    )

    docs = load_pdf(
        filename
    )

    all_chunks = []

    for doc in docs:

        chunks = create_chunks(
            doc["text"]
        )

        for chunk in chunks:

            all_chunks.append({

                "chunk_id": chunk_id,

                "scope": "global",

                "content_type": "pdf",

                "source": doc["source"],

                "page": doc["page"],

                "text": chunk

            })

            chunk_id += 1

    if all_chunks:

        print(
            "\nGenerating embeddings..."
        )

        store_embeddings(
            all_chunks
        )

        print(
            f"Added {len(all_chunks)} chunks."
        )

    mark_indexed(
        file_hash,
        filename
    )


# ==========================
# Gemini model
# ==========================

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


# ==========================
# Main Answer Function
# ==========================

def generate_answer(query, chat_id):

    try:

        # ==================================================
        # STEP 1
        # ==================================================

        print("\n========== CHAT DEBUG ==========")

        print(
            "STEP 1: before get_history"
        )

        history = get_history(
            chat_id
        )

        print(
            "STEP 2: get_history successful"
        )

        # ==================================================
        # Conversation History
        # ==================================================

        recent_history_text = ""

        for msg in history[-6:]:

            recent_history_text += (

                f"{msg['role']}: "

                f"{msg['content']}\n\n"

            )

        # ==================================================
        # STEP 2
        # ==================================================

        print(
            "STEP 3: before add user message"
        )

        add_message(

            chat_id,

            "user",

            query

        )

        print(
            "STEP 4: add user message successful"
        )

        # ==================================================
        # Retrieval Query
        # ==================================================

        recent_history = history[-4:]

        retrieval_query = ""

        for msg in recent_history:

            retrieval_query += (

                msg["content"]

                + "\n"

            )

        retrieval_query += query

        print(
            "STEP 5: retrieval query created"
        )

        """# ==================================================
        # PDF Retrieval
        # ==================================================

        results = retrieve(

            retrieval_query,

            top_k=20

        )

        print(
            f"STEP 6: retrieval successful - "
            f"{len(results)} results"
        )

        # ==================================================
        # Reranking
        # ==================================================

        results = rerank(

            retrieval_query,

            results,

            top_k=5

        )"""
        results = retrieve(
            retrieval_query,
            top_k=10
        )

        print("\n========== RAW RETRIEVAL ==========\n")

        for r in results:
            print(
                r["score"],
                "|",
                r["source"],
                "| page:",
                r["page"]
            )

# Temporarily disable reranking
# results = rerank(
#     retrieval_query,
#     results,
#     top_k=5
# )

        print(
            f"STEP 7: reranking successful - "
            f"{len(results)} results"
        )

        print(
            "\nReranked Results:\n"
        )

        for r in results:

            print(

                r["score"],

                r["source"]

            )

        # ==================================================
        # Context
        # ==================================================

        context = "\n\n".join(

            [

                r["text"]

                for r in results

            ]

        )

        print(
            "\nRetrieved Sources:\n"
        )

        for r in results:

            print(
                r["source"]
            )

        print(
            "\nSTEP 8: context created"
        )

        # ==================================================
        # Dynamic Prompt
        # ==================================================

        if len(context.strip()) > 50:

            prompt = f"""
You are an AI Assistant with PDF-RAG support.

Rules:

1. Use retrieved PDF content FIRST.
2. Improve answer with your own knowledge.
3. Add examples when useful.
4. Format output nicely:
   - headings
   - bullet points
   - code blocks
5. Never say:
   "I cannot answer because context does not contain information."


Conversation History:

{recent_history_text}


Retrieved PDF Context:

{context}


Current Question:

{query}


Generate a complete answer.
"""

        else:

            prompt = f"""
You are an AI coding assistant.

No useful PDF context was found.

Answer using your own knowledge.

Use markdown:

- headings
- lists
- examples
- code blocks


Conversation History:

{recent_history_text}


Retrieved PDF Context:

{context}


Current Question:

{query}
"""

        print(
            "STEP 9: prompt created"
        )

        # ==================================================
        # Gemini
        # ==================================================

        print(
            "STEP 10: before Gemini generation"
        )

        response = model.generate_content(
            prompt
        )

        answer = response.text

        print(
            "STEP 11: Gemini generation successful"
        )

        # ==================================================
        # Save Assistant Answer
        # ==================================================

        print(
            "STEP 12: before add assistant message"
        )

        add_message(

            chat_id,

            "assistant",

            answer[:3000]

        )

        print(
            "STEP 13: add assistant message successful"
        )

        # ==================================================
        # Sources
        # ==================================================

        sources = []

        seen = set()

        if len(context.strip()) > 50:

            for r in results:

                key = (

                    r["source"],

                    r["page"]

                )

                if key not in seen:

                    seen.add(
                        key
                    )

                    sources.append({

                        "source":
                        r["source"],

                        "page":
                        r["page"]

                    })

        print(
            "STEP 14: sources created"
        )

        print(
            "========== CHAT DEBUG END ==========\n"
        )

        return {

            "answer":
            answer,

            "sources":
            sources

        }

    # ==================================================
    # Gemini Rate Limit
    # ==================================================

    except ResourceExhausted:

        return {

            "answer":
"""
## Gemini rate limit reached 🚫

Free API quota exceeded.

Wait a few seconds and try again.
""",

            "sources": []

        }

    # ==================================================
    # Any Other Error
    # ==================================================

    except Exception as e:

        print(
            "\n========= ERROR ========="
        )

        print(
            f"ERROR TYPE: {type(e).__name__}"
        )

        print(
            f"ERROR MESSAGE: {str(e)}"
        )

        print(
            "\nFULL TRACEBACK:"
        )

        traceback.print_exc()

        print(
            "=========================\n"
        )

        return {

            "answer":
f"""
## Error

{str(e)}
""",

            "sources": []

        }