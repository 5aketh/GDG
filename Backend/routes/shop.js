import express from "express";
import {db} from "../config/firebaseConfig.js";
import verifySession from "../middlewares/authMiddleware";

const router = express.Router();

// Store new purchase
router.post('/buy', verifySession, async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.user.uid;

  try {
    const purchaseRef = db.collection('purchases').doc();
    await purchaseRef.set({
      userId,
      items,
      totalAmount,
      purchasedAt: new Date()
    });

    res.status(201).json({ message: 'Purchase successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve user's purchase history
router.get('/history', verifySession, async (req, res) => {
  const userId = req.user.uid;

  try {
    const purchaseRef = await db.collection('purchases')
      .where('userId', '==', userId)
      .orderBy('purchasedAt', 'desc')
      .get();

    const purchases = purchaseRef.docs.map(doc => doc.data());
    res.status(200).json({ purchases });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;