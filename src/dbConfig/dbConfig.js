import mongoose from "mongoose";

export async function connectDB() {
    try{
        mongoose.connect(process.env.MONGO_URL );

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            process.exit();
        })
    }catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit();
    }
}