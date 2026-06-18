import os
import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import Json

load_dotenv()

connection = psycopg2.connect(

    os.getenv(

        "DATABASE_URL"

    )

)


def save_session_memory(

        chat_id,

        memory

):

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

                    Json(

                        memory

                    )

                )

            )


def get_session_memory(

        chat_id

):

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