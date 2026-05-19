from rag_engine import generate_answer


result=generate_answer(

"Explain inheritance"

)


print(
"\nANSWER:\n"
)

print(
result["answer"]
)


print(
"\nSOURCES:\n"
)

print(
result["sources"]
)