from retriever import retrieve


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

    results = retrieve(
        query,
        top_k=20
    )

    for i, result in enumerate(results[:10], 1):

        print(
            f"{i}. "
            f"Score: {result.get('score')} | "
            f"Source: {result.get('source')} | "
            f"Page: {result.get('page')}"
        )