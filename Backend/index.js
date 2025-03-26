import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/session.js";
import chatbotRoutes from "./routes/chatbot.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3000",  // Allow frontend origin
  credentials: true
}));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(sessionRoutes);
app.use("/api", chatbotRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});