import os
import uuid
import psycopg2
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(
    os.getenv("DATABASE_URL")
)

connection.autocommit = True


# ==========================
# Create Project
# ==========================

def create_project(

    project_name,

    project_path

):

    with connection:

        with connection.cursor() as cursor:

            # Check if project already exists

            cursor.execute(

                """

                SELECT project_id

                FROM projects

                WHERE project_path = %s

                """,

                (

                    project_path,

                )

            )

            existing = cursor.fetchone()

            if existing:

                return existing[0]

            project_id = str(

                uuid.uuid4()

            )

            cursor.execute(

                """

                INSERT INTO projects

                (

                    project_id,

                    project_name,

                    project_path

                )

                VALUES

                (

                    %s,

                    %s,

                    %s

                )

                """,

                (

                    project_id,

                    project_name,

                    project_path

                )

            )

    return project_id


# ==========================
# Get Project
# ==========================

def get_project(

    project_id

):

    with connection.cursor() as cursor:

        cursor.execute(

            """

            SELECT

                project_id,

                project_name,

                project_path,

                status,

                created_at

            FROM projects

            WHERE project_id = %s

            """,

            (

                project_id,

            )

        )

        result = cursor.fetchone()

    if result:

        return {

            "project_id": result[0],

            "project_name": result[1],

            "project_path": result[2],

            "status": result[3],

            "created_at": result[4]

        }

    return None

# ==========================
# List Projects
# ==========================

def list_projects():

    with connection.cursor() as cursor:

        cursor.execute(

            """

            SELECT

                project_id,

                project_name,

                project_path,

                status,

                created_at

            FROM projects

            ORDER BY created_at DESC

            """

        )

        results = cursor.fetchall()

    projects = []

    for row in results:

        projects.append({

            "project_id": row[0],

            "project_name": row[1],

            "project_path": row[2],

            "status": row[3],

            "created_at": row[4]

        })

    return projects


# ==========================
# Update Status
# ==========================

def update_project_status(

    project_id,

    status

):

    with connection:

        with connection.cursor() as cursor:

            cursor.execute(

                """

                UPDATE projects

                SET status = %s

                WHERE project_id = %s

                """,

                (

                    status,

                    project_id

                )

            )


# ==========================
# Delete Project
# ==========================

def delete_project(

    project_id

):

    with connection:

        with connection.cursor() as cursor:

            cursor.execute(

                """

                DELETE FROM projects

                WHERE project_id = %s

                """,

                (

                    project_id,

                )

            )