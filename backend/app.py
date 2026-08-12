from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_engine import generate_answer
from conversation_memory import create_chat, get_history
import traceback
import uuid

app = Flask(__name__)

CORS(app)


@app.route("/")
def home():
    return "AI Assistant Running 🚀"


# ==========================
# Create New Chat
# ==========================

@app.route("/chats", methods=["POST"])
def create_new_chat():

    try:
        data = request.get_json(silent=True) or {}

        title = data.get("title", "New Chat")

        chat_id = str(uuid.uuid4())

        create_chat(
            chat_id,
            title
        )

        return jsonify({
            "chat_id": chat_id,
            "title": title
        }), 201

    except Exception as e:

        print("\n========= ERROR =========")
        traceback.print_exc()
        print("=========================\n")

        return jsonify({
            "error": str(e)
        }), 500


# ==========================
# Chat
# ==========================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json(silent=True) or {}

        query = data.get("message", "").strip()
        chat_id = data.get("chat_id")

        if not query:
            return jsonify({
                "error": "Message is required"
            }), 400

        if not chat_id:
            return jsonify({
                "error": "chat_id is required"
            }), 400

        result = generate_answer(
            query,
            chat_id
        )

        return jsonify(result)

    except Exception as e:

        print("\n========= ERROR =========")
        traceback.print_exc()
        print("=========================\n")

        return jsonify({
            "error": str(e)
        }), 500


# ==========================
# Get Chat History
# ==========================

@app.route("/chats/<chat_id>", methods=["GET"])
def chat_history(chat_id):

    try:

        history = get_history(chat_id)

        return jsonify({
            "chat_id": chat_id,
            "messages": history
        })

    except Exception as e:

        print("\n========= ERROR =========")
        traceback.print_exc()
        print("=========================\n")

        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":

    app.run(
        debug=True,
        use_reloader=False,
        port=5000
    )