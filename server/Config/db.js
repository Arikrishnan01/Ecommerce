import mongoose from "mongoose";

export const connectDB =async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB CONNECTED`.blue.underline.italic);
    }
    catch(error){
        console.log(`Error: ${error.message}`.red.bold.underline);
    }
}