import google.generativeai as genai


def expand_query(query):

    model = genai.GenerativeModel(

        "gemini-2.5-flash"

    )

    prompt = f"""

Expand the following query for semantic search.

Keep the original meaning.

Add related keywords and concepts.

Return only expanded text.

Query:

{query}

"""

    response = model.generate_content(

        prompt

    )

    return response.text.strip()