import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id : { type: String, required: true, unique: true },
    username: {type: String, required: true},
    Name: {type: String, required: true},
    avatar: {type: String, required:true},
    platforms: {
        type: Object, required: true
    },
    difficulty_pref: {type: String, required: true, enum: ["Easy", "Medium", "Hard"]},
    problems_solved: {type: Number, required: true},

    createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.model('User', userSchema);
