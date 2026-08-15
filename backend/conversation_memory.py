import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()


# ==========================
# Database Connection
# ==========================

def get_connection():
    return psycopg2.connect(
        os.getenv("DATABASE_URL")
    )


# ==========================
# Create Chat
# ==========================

def create_chat(chat_id, title):

    connection = get_connection()

    try:
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

    finally:
        connection.close()


# ==========================
# Add Message
# ==========================

def add_message(chat_id, role, content):

    connection = get_connection()

    try:
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

    finally:
        connection.close()


# ==========================
# Get Recent History
# ==========================

def get_history(chat_id, limit=6):

    connection = get_connection()

    try:
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

    finally:
        connection.close()


# ==========================
# Clear Chat
# ==========================

def clear_chat(chat_id):

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                DELETE FROM messages

                WHERE chat_id = %s
                """,
                (chat_id,)
            )

        connection.commit()

    finally:
        connection.close()


# ==========================
# Delete Chat
# ==========================

def delete_chat(chat_id):

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                DELETE FROM messages

                WHERE chat_id = %s
                """,
                (chat_id,)
            )

        connection.commit()

    finally:
        connection.close()


# ==========================
# Get Message Count
# ==========================

def get_message_count(chat_id):

    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT COUNT(*)

                FROM messages

                WHERE chat_id = %s
                """,
                (chat_id,)
            )

            count = cursor.fetchone()[0]

        return count

    finally:
        connection.close()