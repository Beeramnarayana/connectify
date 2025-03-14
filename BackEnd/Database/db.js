import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
        dbName:"test", 

        });
        console.log('MongoDB connected');
    } 
    catch (error) {
        console.error(error);
    }
}
