from sentence_transformers import SentenceTransformer
from qdrant_client.models import PointStruct

from qdrant_db import (
    client,
    COLLECTION_NAME
)

# Load model once
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def store_embeddings(all_chunks):

    print(
        "Generating embeddings..."
    )

    points = []

    for chunk in all_chunks:

        embedding = model.encode(

            chunk["text"]

        ).tolist()

        points.append(

            PointStruct(

                id=chunk["chunk_id"],

                vector=embedding,

                payload={

                    "source":
                    chunk["source"],

                    "page":
                    chunk["page"],

                    "text":
                    chunk["text"]

                }

            )

        )

    client.upsert(

        collection_name=COLLECTION_NAME,

        points=points

    )

    count_result = client.count(

        collection_name=COLLECTION_NAME,

        exact=True

    )

    print(

        f"Embeddings stored in Qdrant."

    )

    print(

        f"Total vectors in collection: {count_result.count}"

    )