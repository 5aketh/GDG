import session from 'express-session';
import dotenv from "dotenv";

dotenv.config();

const sessionConfig = session({
  secret: process.env.SESSION_SECRET || "supersecretkey",    // Use a secret key for encryption
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,           // Prevent client-side access
    secure: false,            // Set to true in production (with HTTPS)
    maxAge: 1000 * 60 * 60 * 24 * 7   // 1 week expiration time
  }
});

export default sessionConfig;



// // Protected route
// router.get("/verify-session", verifySession, async (req, res) => {
//   const userId = req.user.uid;
//   const userDoc = await auth.getUser(userId);
//   res.json({
//     uid: userDoc.uid,
//     email: userDoc.email,
//     displayName: userDoc.displayName,
//   });
// });

// export default router;
