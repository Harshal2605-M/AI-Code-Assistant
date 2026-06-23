import json
import os

CHUNK_FILE = "all_chunks.json"


def save_chunks(chunks):

    if os.path.exists(CHUNK_FILE):

        with open(CHUNK_FILE, "r", encoding="utf-8") as f:
            existing_chunks = json.load(f)

    else:
        existing_chunks = []


    existing_ids = {

        chunk["chunk_id"]

        for chunk in existing_chunks

    }


    new_chunks = [

        chunk

        for chunk in chunks

        if chunk["chunk_id"] not in existing_ids

    ]


    existing_chunks.extend(

        new_chunks

    )


    with open(

        CHUNK_FILE,

        "w",

        encoding="utf-8"

    ) as f:

        json.dump(

            existing_chunks,

            f,

            indent=4,

            ensure_ascii=False

        )