import express, { response } from "express";
import { db } from "../config/firebaseConfig.js";
import verifySession from "../middlewares/authMiddleware.js";
import chatRateLimiter from "../middlewares/chatRateLimiter.js";
import { getGeminiResponse } from "../config/geminiService.js";

const router = express.Router();

// Store new chat message
router.post('/send', verifySession, chatRateLimiter, async (req, res) => {
  const { message } = req.body;
  const user = req.user;
  if (!message) {
        return res.status(400).json({ error: "Message is required" });
  }

  try {
    try {
      const response = await getGeminiResponse(message);
      if (user){
        const userId = user.uid;
        const chatRef = db.collection('chats').doc();
        await chatRef.set({
          userId,
          messages: [
            { role: 'user', text: message },
            { role: 'assistant', text: response }
          ],
          createdAt: new Date()
        });
      }   

      res.status(201).json({response});
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      res.status(500).json({ error: "Failed to get response from Gemini" });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route - Only authenticated users can access
router.get('/history', verifySession, async (req, res) => {
  const user = req.user;
  if (user){
    const userId = user.uid
    try {
      const chatRef = await db.collection('chats').where('userId', '==', userId).orderBy('createdAt', 'asc').get();
      const chats = chatRef.docs.map(doc => doc.data());
      res.status(200).json({ chats });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;