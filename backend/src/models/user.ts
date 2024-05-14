import mongoose, { Schema } from "mongoose"
import { User as UserInterface } from "../types/user"


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

export const User = mongoose.model<UserInterface>("User", userSchema);