import os
from dotenv import load_dotenv
import google.generativeai as genai

from pdf_loader import load_all_pdfs
from chunker import create_chunks
from vector_store import create_embeddings
from retriever import retrieve


load_dotenv()

genai.configure(
    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


print(
    "Loading PDFs..."
)

docs=load_all_pdfs()


all_chunks=[]

for doc in docs:

    chunks=create_chunks(
        doc["text"]
    )

    for chunk in chunks:

        all_chunks.append({

            "source":
            doc["source"],

            "text":
            chunk
        })


print(
"Creating embeddings..."
)

vectors=create_embeddings(
    all_chunks
)


# Gemini model
model = genai.GenerativeModel(
    "gemini-2.5-flash"
)



def generate_answer(
    query
):

    results=retrieve(

        query,

        vectors
    )


    context="\n\n".join(

        [
            r["text"]

            for r in results
        ]

    )


    print(
    "\nRetrieved:\n"
    )

    for r in results:

        print(
            r["source"]
        )


    prompt=f"""

You are an AI coding assistant.

Use the context below:

{context}


Question:

{query}


Explain clearly.
Give examples if needed.
"""



    response=model.generate_content(
        prompt
    )


    return {

        "answer":
        response.text,

        "sources":[

            r["source"]

            for r in results
        ]
    }