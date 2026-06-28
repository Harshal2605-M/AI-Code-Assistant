import os

from config import (

    SUPPORTED_EXTENSIONS,

    IGNORE_FOLDERS

)


# ==========================
# Load Project Files
# ==========================

def load_project(

    project_id,

    project_path

):

    project_files = []

    for root, dirs, files in os.walk(

        project_path

    ):

        # Ignore unwanted folders

        dirs[:] = [

            directory

            for directory in dirs

            if directory not in IGNORE_FOLDERS

        ]

        for file in files:

            extension = os.path.splitext(

                file

            )[1].lower()

            if extension not in SUPPORTED_EXTENSIONS:

                continue

            file_path = os.path.join(

                root,

                file

            )

            relative_path = os.path.relpath(

                file_path,

                project_path

            )

            try:

                with open(

                    file_path,

                    "r",

                    encoding="utf-8",

                    errors="ignore"

                ) as f:

                    content = f.read()

                project_files.append({

                    "project_id": project_id,

                    "file_path": relative_path,

                    "extension": extension,

                    "content": content

                })

            except Exception as e:

                print(

                    f"Could not read {relative_path}: {e}"

                )

    return project_files