import openai

# Set your OpenAI API key
openai.api_key = 'YOUR_API_KEY'

# Upload a file with the purpose of assisting the assistant
file = openai.File.create(
    file=open("knowledge.pdf", "rb"),
    purpose='assistants'
)

# Create an assistant with retrieval tools and associate the uploaded file
assistant = openai.Assistant.create(
    instructions="You are a moonshot finder. Use your knowledge base to generate innovative business ideas.",
    model="gpt-4-1106-preview",
    tools=[{"type": "retrieval"}],
    file_ids=[file.id]
)

# Function to interact with the assistant for moonshot finding
def find_moonshot(question):
    response = openai.Message.create(
        assistant_id=assistant.id,
        role="user",
        content=question,
        file_ids=[file.id]
    )
    return response['data'][0]['text']

# Example usage:
question = "What are some novel circular economy solutions using renewable energy?"
moonshot_idea = find_moonshot(question)
print("Generated Moonshot Idea:", moonshot_idea)
