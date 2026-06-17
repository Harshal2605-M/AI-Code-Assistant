import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

from pdf_loader import load_all_pdfs
from chunker import create_chunks
from vector_store import store_embeddings
from hash_utils import compute_file_hash
from index_registry import (
    is_indexed,
    mark_indexed
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

docs = load_all_pdfs()

all_chunks = []

chunk_id = get_next_chunk_id()


for doc in docs:

    filepath = os.path.join(
        base_dir,
        "docs",
        doc["source"]
    )

    file_hash = compute_file_hash(
        filepath
    )


    if is_indexed(file_hash):

        print(
            f"Skipping {doc['source']} (already indexed)"
        )

        continue


    print(
        f"Indexing {doc['source']}"
    )


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


    mark_indexed(

        file_hash,

        doc["source"]

    )

if all_chunks:

    print(
        "\nGenerating embeddings..."
    )

    store_embeddings(
        all_chunks
    )

    print(

        f"\nNew chunks added: {len(all_chunks)}"

    )

else:

    print(

        "\nNo new PDFs to index."

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

def generate_answer(query):

    try:

        # --------------------
        # Retrieve PDF context
        # --------------------

        results=retrieve(

            query

        )


        context="\n\n".join(

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

            prompt=f"""

You are an AI Assistant with PDF-RAG support.

Rules:

1. Use retrieved PDF content FIRST.
2. Improve answer with your own Gemini knowledge.
3. Add examples when useful.
4. Format output nicely:
   - headings
   - bullet points
   - code blocks
5. Never say:
   "I cannot answer because context does not contain information."

Retrieved PDF Context:

{context}


User Question:

{query}


Generate a complete answer.

"""

        else:

            prompt=f"""

You are an AI coding assistant.

No useful PDF context was found.

Answer using your own knowledge.

Use markdown:

- headings
- lists
- examples
- code blocks

Question:

{query}

"""


        # --------------------
        # Gemini generation
        # --------------------

        response=model.generate_content(
            prompt
        )


        answer=response.text


        # --------------------
        # Only keep sources
        # if retrieval worked
        # --------------------

        sources=[]

        if len(context.strip())>50:

            sources=list(

                set(

                    [

                        r["source"]

                        for r in results

                    ]

                )

            )


        return{

            "answer":
            answer,

            "sources":
            sources

        }


    except ResourceExhausted:

        return{

            "answer":
"""
## Gemini rate limit reached 🚫

Free API quota exceeded.

Wait a few seconds and try again.
""",

            "sources":[]
        }


    except Exception as e:

        print(
            "\n========= ERROR ========="
        )

        print(e)

        print(
            "=========================\n"
        )


        return{

            "answer":
f"""
## Error

{str(e)}
""",

            "sources":[]
        }