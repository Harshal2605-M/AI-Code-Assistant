from hybrid_retriever import hybrid_retrieve


query = "query = What is inheritance in Java?"


results = hybrid_retrieve(
    query,
    top_k=40
)


print("\nHybrid Retrieval Results:\n")


for i, result in enumerate(results, 1):

    print("=" * 80)

    print(f"Rank: {i}")

    print(
        f"Dense Score: "
        f"{result.get('score', 'N/A')}"
    )

    print(
        f"BM25 Score: "
        f"{result.get('bm25_score', 'N/A')}"
    )

    print(
        f"Source: "
        f"{result['source']}"
    )

    print(
        f"Page: "
        f"{result['page']}"
    )

    print(
        f"Text: "
        f"{result['text'][:500]}"
    )