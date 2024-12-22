import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";

dotenv.config();
const anthropic = new Anthropic({
  apiKey: process.env.X_AI_API_KEY,
  baseURL: "https://api.x.ai/",
});

const MAX_TOKENS = 4096;

export async function generateScriptWithAI(prompt, language = "en") {
  try {
    const response = await anthropic.messages.create({
      model: "grok-2-1212",
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: "user",
          content: `Generate a video script in ${language} based on this prompt: ${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    if (!response.content) {
      throw new Error("No content received from AI service");
    }

    return response.content;
  } catch (error) {
    console.error("AI API Error:", error);

    if (error.status === 401) {
      throw new Error(
        "Invalid API key. Please check your authentication credentials."
      );
    } else if (error.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    } else if (error.status === 422) {
      throw new Error("Invalid request parameters. Please check your input.");
    }

    throw new Error(
      "Failed to generate script with AI. Please try again later."
    );
  }
}
