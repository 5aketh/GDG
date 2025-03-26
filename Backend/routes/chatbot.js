import express from "express";
import { client, endpoint } from "../vertexAIconfig.js";

const router = express.Router();

router.post("/chatbot", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        // Prepare the payload for the model
        const instance = { content: message };
        const request = {
            endpoint: endpoint,
            instances: [instance],
            parameters: {
                temperature: 0.7,
                topP: 0.9,
                maxTokens: 500,
            },

        };

        // Make the prediction call
        const [response] = client.predict(request);   // await needed here?
        
        const prediction = response.predictions[0]?.content || "No response";
        
        res.status(200).json({ reply: prediction });

    } catch (error) {
        console.error("Error calling Vertex AI:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

export default router;
