import express from "express";
import { auth } from "../firebaseConfig.js";

const router = express.Router();

// Middleware to verify session
const verifySession = async (req, res, next) => {
  const sessionCookie = req.cookies.session || "";
  
  if (!sessionCookie) {
    return res.status(401).json({ message: "Unauthorized: No session" });
  }

  try {
    // decode the session cookie to get user data
    const decodeClaims = await auth.verifySessionCookie(sessionCookie, true);
    req.user = decodeClaims;
    next(); // Continue to the next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid session" });
  }
};

// Protected route
router.get("/verify-session", verifySession, async (req, res) => {
  const userId = req.user.uid;
  const userDoc = await auth.getUser(userId);
  res.json({
    uid: userDoc.uid,
    email: userDoc.email,
    displayName: userDoc.displayName,
  });
});

export default router;
