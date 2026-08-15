from qdrant_db import client, COLLECTION_NAME
from bm25_store import BM25Store


def get_all_documents():

    documents = []

    offset = None

    while True:

        points, offset = client.scroll(

            collection_name=COLLECTION_NAME,

            limit=100,

            offset=offset,

            with_payload=True,

            with_vectors=False

        )

        for point in points:

            documents.append({

                "source": point.payload["source"],

                "page": point.payload["page"],

                "text": point.payload["text"]

            })

        print(

            f"Loaded {len(documents)} documents..."

        )

        if offset is None:

            break

    return documents


print("\nBuilding BM25 index...\n")


documents = get_all_documents()

print(

    f"\nTotal documents loaded: {len(documents)}"

)


store = BM25Store()

store.build(

    documents

)

store.save()


print(

    "\nBM25 index created successfully."

)