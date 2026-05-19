from sentence_transformers import SentenceTransformer

# Load model once
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def create_embeddings(
    all_chunks
):

    vectors=[]

    print(
        "Generating embeddings..."
    )

    for chunk in all_chunks:

        embedding = model.encode(
            chunk["text"]
        )

        vectors.append({

            "source":
            chunk["source"],

            "text":
            chunk["text"],

            "embedding":
            embedding

        })

    print(
        "Embeddings ready"
    )

    return vectors