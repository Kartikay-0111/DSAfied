const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const doubtSchema = new Schema({
    problemId: { type: Schema.Types.ObjectId, ref: 'Problem', required: true },
    askedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    responses: [responseSchema]
});

module.exports = mongoose.model('Doubt', doubtSchema);