import os
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


# ==========================
# Load environment
# ==========================

base_dir = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path)

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

                "chunk_id":
                chunk_id,

                "source":
                doc["source"],

                "page":
                doc["page"],

                "text":
                chunk

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

model=genai.GenerativeModel(
    "gemini-2.5-flash"
)


# ==========================
# Main Answer Function
# ==========================

def generate_answer(query, chat_id):

    try:

        # --------------------
        # Save user message
        # --------------------

        # --------------------
        # Load history
        # --------------------

        history = get_history(
            chat_id
        )


        history_text = ""

        for msg in history:

            history_text += (

                f"{msg['role'].capitalize()}: "

                f"{msg['content']}\n\n"

            )


        # --------------------
        # Save current user query
        # --------------------

        add_message(

            chat_id,

            "user",

            query

        )

        # --------------------
        # Retrieval query
        # --------------------

        recent_history = history[-4:]

        retrieval_query = ""

        for msg in recent_history:

            retrieval_query += (

                msg["content"]

                + "\n"

            )

        retrieval_query += query



        # --------------------
        # Retrieve PDF context
        # --------------------

        results = retrieve(

            retrieval_query

        )


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


        # --------------------
        # Dynamic prompt
        # --------------------

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

{history_text}


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

{history_text}


Current Question:

{query}

"""

        # --------------------
        # Gemini generation
        # --------------------

        response = model.generate_content(

            prompt

        )

        answer = response.text


        # --------------------
        # Save assistant answer
        # --------------------

        add_message(

            chat_id,

            "assistant",

            answer[:3000]

        )


        # --------------------
        # Sources
        # --------------------

        sources = []

        if len(context.strip()) > 50:

            sources = list(

                set(

                    [

                        r["source"]

                        for r in results

                    ]

                )

            )


        return {

            "answer":

            answer,

            "sources":

            sources

        }


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


    except Exception as e:

        print(

            "\n========= ERROR ========="

        )

        print(

            e

        )

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