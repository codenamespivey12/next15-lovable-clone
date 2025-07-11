import OpenAI from "openai";

// Initialize the OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate responses using OpenAI with Context7
export async function generateWithContext7(prompt: string, systemInstructions: string) {
  try {
    const response = await openai.responses.create({
      model: "o4-mini",
      input: prompt,
      instructions: systemInstructions,
      reasoning: {
        effort: "high"
      },
      tools: [
        {
          type: "mcp",
          server_label: "context7",
          server_url: "https://mcp.context7.ai/mcp",
          require_approval: "never"
        }
      ]
    });
    
    return response.output_text;
  } catch (error) {
    console.error("Error generating response with Context7:", error);
    throw error;
  }
}