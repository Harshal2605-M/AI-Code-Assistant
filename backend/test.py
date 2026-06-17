from qdrant_db import client, COLLECTION_NAME

records, _ = client.scroll(
    collection_name=COLLECTION_NAME,
    limit=5
)

for record in records:

    print()

    print("ID:", record.id)

    print("Source:",
          record.payload["source"])

    print("Page:",
          record.payload["page"])

    print()

    print(record.payload["text"][:300])

    print("="*80)

client.close()