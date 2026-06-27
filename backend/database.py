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
               
CREATE TABLE IF NOT EXISTS projects (

    project_id UUID PRIMARY KEY,

    project_name TEXT NOT NULL,

    project_path TEXT NOT NULL,

    status TEXT DEFAULT 'indexed',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

""")


connection.commit()

print("Tables created successfully!")


