import mongoose from "mongoose";
// Section Schema
const sectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

// Article Schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  day: {
    type: Number,
    required: true
  },
  sections: [sectionSchema],
}, {
  timestamps: true
});

export const Article = mongoose.model('Article', articleSchema);