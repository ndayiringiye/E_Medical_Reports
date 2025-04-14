import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectdb } from "./Config/db.js";
import  userRouter from "./routes/userRoute.js"
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () =>{
    await connectdb();
    console.log(`server is run on port ${PORT}`);
})