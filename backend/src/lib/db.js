import mongoose from 'mongoose';

export const connectDB = async () => {
    try 
    {
        const con = await mongoose.connect(process.env.MONGODB_URI )  ; 
        console.log(`MongoDB connected: ${con.connection.host}`); // Log the host of the connected MongoDB

    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }

}

