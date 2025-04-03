import express from "express";
import { auth, db } from "../config/firebaseConfig.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import cookieParser from "cookie-parser";

const router = express.Router();
router.use(cookieParser());

const clientAuth = getAuth();

// Signup API
router.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  // format validation and all fields required handled in frontend

  try {
    // Create user in Firebase Auth
    const newUser = await auth.createUser({
      displayName: name,
      email,
      phone,
      password,
    });

    // Store user details in Firestore
    await db.collection("users").doc(newUser.uid).set({
      name,
      email,
      phone,
      uid: newUser.uid,
      createdAt : new Date()
    });

    res.status(201).json({ message: "User signed up successfully!"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login API
router.post("/login", async (req, res) => {
  const { loginType, identifier, password } = req.body;     // login with email or phone

  let email = identifier;
  
  try {
    if (loginType === "phone"){
      const snapshot = await db.collection("users")
          .where("phone", "==", identifier)
        .get();

        if (snapshot.empty) {
          return res.status(404).json({ error: "Phone number not registered" });
        }
    
        const userData = snapshot.docs[0].data();
        email = userData.email;
    }
    
    // checks for credentials in Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(clientAuth, email, password);

    // Get the ID token from the user
    const idToken = await userCredential.user.getIdToken();

    // Create session cookie with the ID token
    const expiresIn = 60 * 60 * 24 * 5 * 1000// 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // Store session in cookie
    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({ message: "User logged in successfully!", uid: userCredential.user.uid });

  } catch (error) {
    res.status(401).json({ error: error.message, message: "Invalid login credentials" });
  }
});

// Logout API
router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.status(200).json({ message: "User logged out successfully" });
});

export default router;
