import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 1000,
  responseModalities: [],
  responseMimeType: "text/plain",
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are an expert Agriculturist. 
    You provide crop recommendations only (if given parameters like temperature, humidity, rainfall, soil nutrients like sodium, potassium, nitrogen content ratio, 
    you provide a crop suitable for such parameters). 
    You also provide advice on general queries related to agriculture. Also help farmers with updating realtime data like weather details and market prices.
    Provide responses in a friendly and short simple manner for the farmers and respond in the language they ask you to advice.
    Decline any request other than agriculture.`,
});

export const getGeminiResponse = async (prompt) => {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: "What is the best crop for Bengaluru currently?" }],
        },
        {
          role: "model",
          parts: [{ text: "Bengaluru’s climate supports vegetables like spinach, beans, and carrots. Let me know if you need specific recommendations." }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const candidates = result.response.candidates;

    if (!candidates || candidates.length === 0) {
      throw new Error("No candidates received from Gemini.");
    }

    // Extracting the text response
    const responseText = candidates[0].content.parts[0].text;

    return responseText;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    throw error;
  }
};

export default getGeminiResponse;