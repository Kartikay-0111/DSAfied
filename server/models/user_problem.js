import mongoose from "mongoose";

const userProblemSchema = new mongoose.Schema({
    auth0Id: { type: String, ref: 'User' },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
    paramrters:[
        {type: Number}
    ],
    solved: { type: Boolean, default: false },
    note: { type: String },
});

export const UserProblem = mongoose.model('UserProblem', userProblemSchema);