import mongoose from "mongoose";
const problemSchema = new mongoose.Schema({
    acRate: {type: Number, required: true},
    difficulty: {type: String, required: true, enum: ["Easy", "Medium", "Hard"]},
    title: {type: String, required:true},
    titleSlug: {type: String, required: true},
    topicTags: [{type: String, required: true }],
    popularity: {type: Number, required: true},
    doubts: [{
        doubtId: { type: mongoose.Schema.Types.ObjectId}
    }],
});
export const Problem = mongoose.model('Problem', problemSchema);