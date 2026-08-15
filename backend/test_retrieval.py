from retriever import retrieve
from reranker import rerank


queries = [
    "What is inheritance in Java?",
    "What is a pointer in C++?",
    "What is a primary key in DBMS?",
    "What is normalization in DBMS?",
    "What is a process in Linux?",
    "What is a dictionary in Python?",
    "What is batch normalization in deep learning?",
    "What is attention in NLP?"
]


for query in queries:

    print("\n" + "=" * 80)
    print("QUERY:", query)
    print("=" * 80)

    # ------------------------------------------------
    # Step 1: Retrieve 30 candidates from Qdrant
    # ------------------------------------------------

    results = retrieve(
        query,
        top_k=30
    )

    print("\nBEFORE RERANKING - TOP 30")
    print("-" * 80)

    for i, result in enumerate(results, start=1):

        print(
            f"{i}. "
            f"Score: {result['score']:.4f} | "
            f"Source: {result['source']} | "
            f"Page: {result['page']}"
        )

    # ------------------------------------------------
    # Step 2: Rerank the 30 candidates
    # ------------------------------------------------

    reranked = rerank(
        query,
        results,
        top_k=5
    )

    print("\nAFTER RERANKING - TOP 5")
    print("-" * 80)

    for i, result in enumerate(reranked, start=1):

        print(
            f"{i}. "
            f"Score: {result['score']:.4f} | "
            f"Source: {result['source']} | "
            f"Page: {result['page']}"
        )