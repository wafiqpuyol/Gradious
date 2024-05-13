import 'dotenv/config'
import mongoose from 'mongoose';
export const DBInit = (): void => {
    try {
        console.log(process.env.MONGODB_URL);
        mongoose.connect(process.env.MONGODB_URL as string);
    } catch (error: any) {
        console.log(error);
    }
};
export const PORT = 5200;
