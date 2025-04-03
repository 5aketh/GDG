import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/session.js";
import chatbotRoutes from "./routes/chatbot.js"
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 60 * 24 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
  headers: true,
});

app.use(cors({
  origin: [process.env.FRONTEND_LOCALHOST, process.env.FRONTEND_EXTERNAL_IP],  // Allow frontend origin
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/chat", apiLimiter, chatbotRoutes);
// app.use("/shop", shopRoutes);

app.get("/", (req,res)=>{
  res.send("Annadata Project Running...")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});