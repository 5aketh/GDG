import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/session.js";
import chatbotRoutes from "./routes/chatbot.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [process.env.FRONTEND_LOCALHOST, process.env.FRONTEND_EXTERNAL_IP],  // Allow frontend origin
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/chat", chatbotRoutes);
// app.use("/shop", shopRoutes);

app.get("/", (req,res)=>{
  res.send("Annadata Project Running...")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});