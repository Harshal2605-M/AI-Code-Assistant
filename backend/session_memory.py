import os
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import Json

load_dotenv()


# ==========================
# Database Connection
# ==========================

def get_connection():
    return psycopg2.connect(
        os.getenv("DATABASE_URL")
    )


# ==========================
# Save Session Memory
# ==========================

def save_session_memory(
        chat_id,
        memory
):

    connection = get_connection()

    try:
        with connection:
            with connection.cursor() as cursor:

                cursor.execute(
                    """
                    INSERT INTO session_memory
                    (
                        chat_id,
                        memory
                    )
                    VALUES
                    (
                        %s,
                        %s
                    )
                    ON CONFLICT (chat_id)
                    DO UPDATE
                    SET memory = EXCLUDED.memory
                    """,
                    (
                        chat_id,
                        Json(memory)
                    )
                )

    finally:
        connection.close()


# ==========================
# Get Session Memory
# ==========================

def get_session_memory(
        chat_id
):

    connection = get_connection()

    try:
        with connection:
            with connection.cursor() as cursor:

                cursor.execute(
                    """
                    SELECT memory
                    FROM session_memory
                    WHERE chat_id = %s
                    """,
                    (
                        chat_id,
                    )
                )

                result = cursor.fetchone()

        if result:
            return result[0]

        return {}

    finally:
        connection.close()


# ==========================
# Update Session Memory
# ==========================

def update_session_memory(
        chat_id,
        key,
        value
):

    memory = get_session_memory(
        chat_id
    )

    memory[key] = value

    save_session_memory(
        chat_id,
        memory
    )


# ==========================
# Merge Session Memory
# ==========================

def merge_session_memory(
        chat_id,
        new_memory
):

    memory = get_session_memory(
        chat_id
    )

    memory.update(
        new_memory
    )

    save_session_memory(
        chat_id,
        memory
    )