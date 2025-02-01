import { Daily } from "../models/daily.js";
import { Problem } from "../models/problem.js";
import { MCQ } from "../models/mcq.js";
import { auth } from "express-oauth2-jwt-bearer";
import { calculateDailyScores } from "./calcProbScores.js";

// Fetch 3 random problems for the day
const getDailyProblems = async (sub) => {
  const today = new Date().toLocaleDateString("en-CA");
  let daily = await Daily.findOne({ date: today });

  if (!daily) {

    const randomProblems = await calculateDailyScores(sub);
    const mcqsForDay = await MCQ.aggregate([{ $sample: { size: 3 } }]);

    daily = await Daily.create({
      date: today,
      problems: randomProblems,
      mcqs: mcqsForDay,
    });
  }
  // console.log(daily);
  return daily;
};

// Get the MCQs and problems for the day
async function getDaily(req, res) {
  try {
    const { sub } = req.auth.payload;
    console.log("sub is = ", sub);
    const daily = await getDailyProblems(sub);
    if (!daily) {
      return res.status(404).send("Daily data not found");
    }
    res.send({ problems: daily.problems, mcqs: daily.mcqs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

async function getMcq(req, res) {
  const id = req.params.id;
  try {
    const mcq = await MCQ.findById(id);
    res.json(mcq);
    res.status(200);
    res.send();
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}
export { getDaily, getMcq };