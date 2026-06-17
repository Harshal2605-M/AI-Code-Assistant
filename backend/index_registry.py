import json
import os

REGISTRY_FILE = "indexed_files.json"


def load_registry():

    if not os.path.exists(REGISTRY_FILE):

        return {}

    with open(REGISTRY_FILE, "r") as f:

        return json.load(f)


def save_registry(registry):

    with open(REGISTRY_FILE, "w") as f:

        json.dump(
            registry,
            f,
            indent=4
        )


def is_indexed(file_hash):

    registry = load_registry()

    return file_hash in registry


def mark_indexed(
        file_hash,
        filename
):

    registry = load_registry()

    registry[file_hash] = {

        "filename": filename

    }

    save_registry(registry)