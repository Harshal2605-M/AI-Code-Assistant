import os
from pypdf import PdfReader

def load_all_pdfs(folder="docs"):

    all_text=[]

    for file in os.listdir(folder):

        if file.endswith(".pdf"):

            path=os.path.join(
                folder,
                file
            )

            print(
                "Loading:",
                file
            )

            reader=PdfReader(path)

            text=""

            for page in reader.pages:

                content=page.extract_text()

                if content:

                    text += content+"\n"


            all_text.append({

                "source":file,

                "text":text

            })


    return all_text