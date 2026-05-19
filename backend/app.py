from flask import Flask, request, jsonify
from flask_cors import CORS
from rag_engine import generate_answer
import traceback

app = Flask(__name__)

# Enable CORS
CORS(app)

@app.route("/")
def home():
    return "AI Assistant Running 🚀"


@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.json

        query = data.get(
            "message",
            ""
        )

        result = generate_answer(query)

        return jsonify(result)

    except Exception as e:

        print("\n========= ERROR =========")
        traceback.print_exc()
        print("=========================\n")

        return jsonify({
            "error": str(e)
        }),500


if __name__=="__main__":

    app.run(
        debug=True,
        port=5000
    )