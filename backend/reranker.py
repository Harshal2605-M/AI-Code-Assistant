from sentence_transformers import CrossEncoder


# ==========================
# Load CrossEncoder model
# ==========================

model = CrossEncoder(

    "cross-encoder/ms-marco-MiniLM-L-6-v2"

)


# ==========================
# Rerank Results
# ==========================

def rerank(

        query,

        results,

        top_k=5

):

    # ----------------------
    # Empty results
    # ----------------------

    if not results:

        return []


    # ----------------------
    # Build query-chunk pairs
    # ----------------------

    pairs = [

        (

            query,

            result["text"]

        )

        for result in results

    ]


    # ----------------------
    # Predict relevance scores
    # ----------------------

    scores = model.predict(

        pairs

    )


    # ----------------------
    # Attach score
    # ----------------------

    for result, score in zip(

            results,

            scores

    ):

        result["score"] = float(

            score

        )


    # ----------------------
    # Sort by score
    # ----------------------

    sorted_results = sorted(

        results,

        key=lambda x: x["score"],

        reverse=True

    )


    # ----------------------
    # Return top chunks
    # ----------------------

    return sorted_results[

        :top_k

    ]