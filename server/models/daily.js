import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
    date: { type: Date, required: true},
    problems: [
        {
            problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }
        }
    ],
    mcqs:[
        {
            mcqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mcq' },
            question: { type: String, required: true },
            options: [String],
            correct_option: { type: Number, required: true },
            explanation: { type: String, required: true },
            day: { type: Number, required: true }
        }
    ]
});

export const Daily = mongoose.model('Daily', dailySchema);