import mongoose from "mongoose";

const mcqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: Array, required: true },
    correctOption: { type: Number, required: true },
    explanation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
export const MCQ = mongoose.model('MCQ', mcqSchema);