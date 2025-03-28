import express from "express";
import { getGeminiResponse } from "../geminiService.js";

const router = express.Router();

router.post("/gemini", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await getGeminiResponse(prompt);
    res.json({ response });
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

export default router;