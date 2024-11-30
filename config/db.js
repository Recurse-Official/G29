import mongoose from 'mongoose'
import dotenv  from 'dotenv'
dotenv.config()

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connection Established');
    } catch (error) {
        console.error('Mongoose connection Error:', error);
    }
};

export default connectDB;