import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  id: String,
  step_no: Number,
  sl_no_in_step: Number,
  head_step_no: String,
  title: String,
  post_link: String,
  yt_link: String,
  cs_link: String,
  gfg_link: String,
  lc_link: String,
  company_tags: [String], // Assuming array of strings
  difficulty: Number,
  ques_topic: String, // Store as JSON string or Array of Objects
});

const sheetSchema = new mongoose.Schema({
  step_no: Number,
  head_step_no: String,
  topics: [topicSchema], // Embedding topics inside steps
});

export const Sheet = mongoose.model("Sheet", sheetSchema);

