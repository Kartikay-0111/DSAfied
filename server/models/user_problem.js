import mongoose from "mongoose";

const userProblemSchema = new mongoose.Schema({
    auth0Id: { type: String, ref: 'User' },
    problems : [{
        id:{type:String},
        isSolved : {type:Boolean},
        note : {type:String},
        parameters : [],
    }]
});

export const UserProblem = mongoose.model('UserProblem', userProblemSchema)