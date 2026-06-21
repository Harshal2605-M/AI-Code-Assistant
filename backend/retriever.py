from sentence_transformers import SentenceTransformer

from qdrant_db import (
    client,
    COLLECTION_NAME
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def retrieve(
    query,
    top_k=5
):

    query_embedding = model.encode(
        query
    ).tolist()

    results = client.query_points(

        collection_name=COLLECTION_NAME,

        query=query_embedding,

        limit=top_k

    )

    retrieved = []

    for point in results.points:

        retrieved.append({

            "score":
            point.score,

            "source":
            point.payload["source"],

            "page":
            point.payload["page"],

            "text":
            point.payload["text"]

        })

    return retrieved