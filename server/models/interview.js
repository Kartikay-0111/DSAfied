const problemSchema = new mongoose.Schema({
    id: {type: String, required: true},
    step_no: {type: Number, required: true},
    sl_no_in_step:  {type: Number, required: true},
    head_step_no: {type: String, required: true},
    title: {type: String, required: true},
    lc_link: {type: String, required: true},
    gfg_link: {type: String, required: true},
    difficulty: {type: Number, required: true} ,
    ques_topic: {type: String, required: true}  // Store as string, parse when needed
  }
);