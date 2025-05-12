import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectdb } from "./Config/db.js";
import userRouter from "./routes/userRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, '../frontend/public/Download.mp4')));
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  await connectdb();
  console.log(`Server running on port ${PORT}`);
});
