import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id : { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},
    Name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true},
    platforms: {
        type: Object, required: true
    },
    difficulty_pref: {type: String, required: true, enum: ["Easy", "Medium", "Hard"]},
    problems_solved: {type: Number, required: true, default: 0},
    score: {type: Number, required: true, default: 0},
    solved_history:[
        {
            problemId: { type: mongoose.Schema.Types.ObjectId },
            solvedAt: { type: Date, default: Date.now }
        }
    ],
    doubts_asked: [
        {
            doubtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doubt' }
        }
    ],
    doubts_solved : [
        {
            doubtId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doubt' }
        }
    ],
    heatmap:[
        {
            date: { type: Date, default: Date.now },
            count: { type: Number, default: 0 }
        }
    ],
    potdStreak: [
        {
            date: { type: Date, default: Date.now },
            mcqsSolved: { type: Number, default: 0 },
            problemsSolved: { type: Number, default: 0 }
        }
    ],
    badges:[{type: String}],
    createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);