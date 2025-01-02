import mongoose from "mongoose";
const problemSchema = new mongoose.Schema({
    problem_name: {type: String, required: true},
    problem_url: {type: String, required:true},
    difficulty: {type: String, required: true, enum: ["Easy", "Medium", "Hard"]},
    topicTags: [{type: String, required: true }],
    popularity: {type: Number, required: true},
    
});

export const Problem = mongoose.model('Problem', problemSchema);