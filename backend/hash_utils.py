import hashlib


def compute_file_hash(filepath):

    md5 = hashlib.md5()

    with open(filepath, "rb") as f:

        while chunk := f.read(8192):

            md5.update(chunk)

    return md5.hexdigest()

