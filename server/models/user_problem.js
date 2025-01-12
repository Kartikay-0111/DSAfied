import mongoose from "mongoose";

const userProblemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    paramrters:[
        {type: Number}
    ],
    note: { type: String },
});

export const UserProblem = mongoose.model('UserProblem', userProblemSchema);