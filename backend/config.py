import os
from dotenv import load_dotenv

load_dotenv()

SUPPORTED_EXTENSIONS = os.getenv(
    "SUPPORTED_EXTENSIONS",
    ".py,.java,.cpp,.c,.js,.ts,.jsx,.tsx"
).split(",")

IGNORE_FOLDERS = os.getenv(
    "IGNORE_FOLDERS",
    "venv,.venv,__pycache__,.git,node_modules,.idea,.vscode,dist,build"
).split(",")