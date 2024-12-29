import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id : { type: String, required: true, unique: true },
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required:true},
    // dsaLevel: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
    // createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.model('User', userSchema);