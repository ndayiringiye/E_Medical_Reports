import mongoose from "mongoose";

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://ndayiringiyedavid120:6awF4q62gHBZpras@cluster0.a13jreo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("database connected successfully :", conn.connection.host)
    } catch (error) {
        console.log("database connection failed :", error)
    }
}
