import json
import google.generativeai as genai


def refine_memory(

        current_memory,

        new_memory

):

    prompt = f"""

You maintain long-term memory for an AI assistant.

Current Memory:

{json.dumps(current_memory, indent=2)}

New Extracted Memory:

{json.dumps(new_memory, indent=2)}

Instructions:

1. Keep only information useful for future conversations.
2. Remove temporary information.
3. Remove greetings and irrelevant details.
4. Replace outdated values with newer values.
5. Preserve important old information.
6. Return ONLY valid JSON.

"""

    response = genai.GenerativeModel(

        "gemini-2.5-flash"

    ).generate_content(

        prompt

    )

    clean_json = (

        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()

    )

    return json.loads(

        clean_json

    )