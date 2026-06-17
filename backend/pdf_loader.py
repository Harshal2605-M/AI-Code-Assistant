import os
from pypdf import PdfReader


def load_all_pdfs(folder="docs"):

    documents = []

    if not os.path.isabs(folder):

        base_dir = os.path.dirname(
            os.path.abspath(__file__)
        )

        folder = os.path.join(
            base_dir,
            folder
        )

    for file in os.listdir(folder):

        if file.endswith(".pdf"):

            path = os.path.join(
                folder,
                file
            )

            print(
                "Loading:",
                file
            )

            reader = PdfReader(path)

            for page_num, page in enumerate(
                reader.pages,
                start=1
            ):

                content = page.extract_text()

                if content:

                    documents.append({

                        "source": file,

                        "page": page_num,

                        "text": content

                    })

    return documents