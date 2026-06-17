from qdrant_db import client, COLLECTION_NAME

records, _ = client.scroll(
    collection_name=COLLECTION_NAME,
    limit=3
)

for record in records:

    print("\n--------------------")
    print("Point ID:", record.id)

    print("\nPayload:")

    for key, value in record.payload.items():

        if key == "text":

            print(
                f"{key}:",
                value[:200]
            )

        else:

            print(
                f"{key}:",
                value
            )