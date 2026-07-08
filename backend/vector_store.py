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

    if not all_chunks:

        return

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

        payload = {

            key: value

            for key, value in chunk.items()

            if key != "chunk_id"

        }

        payload["chunk_id"] = chunk["chunk_id"]

        payload["indexed_at"] = timestamp

        points.append(

            PointStruct(

                id=chunk["chunk_id"],

                vector=embedding.tolist(),

                payload=payload

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