import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(
    os.getenv("DATABASE_URL")
)



# ==========================
# Create Chat
# ==========================

def create_chat(chat_id, title):
    with connection.cursor() as cursor:
        cursor.execute(

            """
            INSERT INTO chat_sessions
            (chat_id, title)

            VALUES (%s, %s)

            ON CONFLICT (chat_id)

            DO NOTHING
            """,

            (chat_id, title)

        )

    connection.commit()


# ==========================
# Add Message
# ==========================

def add_message(

        chat_id,

        role,

        content

):
    with connection.cursor() as cursor:
        cursor.execute(

            """
            INSERT INTO messages

            (chat_id, role, content)

            VALUES (%s, %s, %s)
            """,

            (

                chat_id,

                role,

                content

            )

        )

    connection.commit()


# ==========================
# Get Recent History
# ==========================

def get_history(

        chat_id,

        limit=6

):

    with connection.cursor() as cursor:

        cursor.execute(

            """
            SELECT role, content

            FROM messages

            WHERE chat_id = %s

            ORDER BY timestamp DESC

            LIMIT %s
            """,

            (

                chat_id,

                limit

            )

        )

        rows = cursor.fetchall()

    rows.reverse()

    history = []

    for role, content in rows:

        history.append(

            {

                "role": role,

                "content": content

            }

        )

    return history


# ==========================
# Clear Chat
# ==========================

def clear_chat(chat_id):
    with connection.cursor() as cursor:
        cursor.execute(

            """
            DELETE FROM messages

            WHERE chat_id = %s
            """,

            (

                chat_id,

            )

        )

    connection.commit()


# ==========================
# Delete Chat
# ==========================

def delete_chat(chat_id):

    with connection.cursor() as cursor:

        cursor.execute(

            """
            DELETE FROM messages

            WHERE chat_id = %s
            """,

            (

                chat_id,

            )

        )


        cursor.execute(

            """
            DELETE FROM chat_sessions

            WHERE chat_id = %s
            """,

            (

                chat_id,

            )

        )

    connection.commit()