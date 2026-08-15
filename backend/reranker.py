from sentence_transformers import CrossEncoder


# ==========================
# Load CrossEncoder model
# ==========================

model = CrossEncoder(
    "BAAI/bge-reranker-v2-m3"
)


# ==========================
# Rerank Results
# ==========================

def rerank(
    query,
    results,
    top_k=5
):

    if not results:
        return []

    pairs = [
        (
            query,
            result["text"]
        )
        for result in results
    ]

    scores = model.predict(
        pairs
    )

    for result, score in zip(
        results,
        scores
    ):

        result["score"] = float(
            score
        )

    sorted_results = sorted(
        results,
        key=lambda x: x["score"],
        reverse=True
    )

    return sorted_results[:top_k]