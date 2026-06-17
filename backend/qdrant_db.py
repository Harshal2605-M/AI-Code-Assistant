from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

# Persistent local database
client = QdrantClient(
    path="./qdrant_data"
)

COLLECTION_NAME = "pdf_notes"

# Create collection only once
if not client.collection_exists(
    collection_name=COLLECTION_NAME
):

    client.create_collection(

        collection_name=COLLECTION_NAME,

        vectors_config=VectorParams(

            size=384,  # all-MiniLM-L6-v2 output dimension

            distance=Distance.COSINE

        )

    )

    print("Collection created!")

else:

    print("Collection already exists.")


def collection_empty():

    count_result = client.count(

        collection_name=COLLECTION_NAME,

        exact=True

    )

    print(
        "Current vectors:",
        count_result.count
    )

    return count_result.count == 0

def get_next_chunk_id():

    count_result = client.count(
        collection_name=COLLECTION_NAME,
        exact=True
    )

    return count_result.count