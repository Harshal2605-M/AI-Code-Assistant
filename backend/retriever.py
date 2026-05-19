import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def cosine(a,b):

    return np.dot(
        a,b
    ) / (

        np.linalg.norm(a)

        *

        np.linalg.norm(b)
    )



def retrieve(
    query,
    vectors,
    top_k=3
):

    query_embedding = model.encode(
        query
    )

    scores=[]


    for item in vectors:

        score=cosine(

            query_embedding,

            item[
                "embedding"
            ]

        )

        scores.append({

            "score":
            score,

            "source":
            item[
                "source"
            ],

            "text":
            item[
                "text"
            ]

        })


    scores=sorted(

        scores,

        key=lambda x:
        x["score"],

        reverse=True

    )


    return scores[:top_k]