from retriever import retrieve


query = "What is normalization in DBMS?"


results = retrieve(

    query,

    top_k=10

)


print("\nBGE Retrieval Results:\n")


for i, result in enumerate(results, 1):

    print("=" * 80)

    print(f"Rank: {i}")

    print(f"Score: {result['score']}")

    print(f"Source: {result['source']}")

    print(f"Page: {result['page']}")

    print(f"Text: {result['text'][:500]}")