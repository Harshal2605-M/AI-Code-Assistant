import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

connection = psycopg2.connect(
    os.getenv("DATABASE_URL")
)

cursor = connection.cursor()

cursor.execute("""

CREATE TABLE IF NOT EXISTS chat_sessions (

    chat_id UUID PRIMARY KEY,

    title TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS messages (

    id SERIAL PRIMARY KEY,

    chat_id UUID,

    role TEXT,

    content TEXT,

    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
               
CREATE TABLE IF NOT EXISTS session_memory (

    chat_id UUID PRIMARY KEY,

    memory JSONB

);

""")


connection.commit()

print("Tables created successfully!")