import mongoose from "mongoose";

const dailySchema = new mongoose.Schema({
    auth0Id: { type: String, ref: 'User' },
    daily: [
        {
            date: { type: Date, required: true },
            problems: [
                {
                    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }
                }
            ],
            mcqs: [
                {
                    mcqId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mcq' },
                }
            ]
        }
    ]

});

export const Daily = mongoose.model('Daily', dailySchema);