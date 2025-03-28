import mongoose from "mongoose";

export const connectDb = async () => {
    console.log("MONGODB_URL:", process.env.MONGODB_URL);  // Debugging

    if (!process.env.MONGODB_URL) {
        console.error("❌ Error: MONGODB_URL is not defined in the environment variables.");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};
