from sentence_transformers import SentenceTransformer
from qdrant_client.models import PointStruct
from datetime import datetime

from qdrant_db import (
    client,
    COLLECTION_NAME
)

model = SentenceTransformer(
    "BAAI/bge-small-en-v1.5"
)


def store_embeddings(all_chunks):

    texts = [

        chunk["text"]

        for chunk in all_chunks

    ]

    embeddings = model.encode(

        texts,

        batch_size=32,

        show_progress_bar=True

    )

    timestamp = datetime.now().isoformat()

    points = []

    for chunk, embedding in zip(
            all_chunks,
            embeddings
    ):

        points.append(

            PointStruct(

                id=chunk["chunk_id"],

                vector=embedding.tolist(),

                payload={

                    "source":
                    chunk["source"],

                    "page":
                    chunk["page"],

                    "chunk_id":
                    chunk["chunk_id"],

                    "text":
                    chunk["text"],

                    "indexed_at":
                    timestamp

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
        "Embeddings stored in Qdrant."
    )

    print(
        f"Total vectors in collection: {count_result.count}"
    )