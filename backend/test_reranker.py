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
    "What is attention in NLP?",
]


for query in queries:

    print("\n")
    print("=" * 80)
    print("QUERY:", query)
    print("=" * 80)

    # --------------------------------
    # Dense retrieval
    # --------------------------------

    results = retrieve(
        query,
        top_k=20
    )

    print("\nBEFORE RERANKING:\n")

    for i, result in enumerate(results, start=1):

        print(
            f"{i}. "
            f"Score: {result.get('score')} | "
            f"Source: {result.get('source')} | "
            f"Page: {result.get('page')}"
        )


    # --------------------------------
    # Reranking
    # --------------------------------

    reranked = rerank(
        query,
        results
    )

    print("\nAFTER RERANKING:\n")

    for i, result in enumerate(reranked, start=1):

        print(
            f"{i}. "
            f"Score: {result.get('rerank_score')} | "
            f"Source: {result.get('source')} | "
            f"Page: {result.get('page')}"
        )