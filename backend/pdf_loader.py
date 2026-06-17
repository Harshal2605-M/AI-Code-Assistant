import os
from pypdf import PdfReader


def list_pdf_files(folder="docs"):

    base_dir = os.path.dirname(
        os.path.abspath(__file__)
    )

    folder = os.path.join(
        base_dir,
        folder
    )

    return [

        file

        for file in os.listdir(folder)

        if file.endswith(".pdf")

    ]


def load_pdf(
        filename,
        folder="docs"
):

    documents = []

    base_dir = os.path.dirname(
        os.path.abspath(__file__)
    )

    path = os.path.join(
        base_dir,
        folder,
        filename
    )

    print(
        "Loading:",
        filename
    )

    reader = PdfReader(path)

    for page_num, page in enumerate(
            reader.pages,
            start=1
    ):

        content = page.extract_text()

        if content:

            documents.append({

                "source": filename,

                "page": page_num,

                "text": content

            })

    return documents