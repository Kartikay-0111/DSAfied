import { Daily } from "../models/daily.js";
import { Problem } from "../models/problem.js";
import { MCQ } from "../models/mcq.js";
import { auth } from "express-oauth2-jwt-bearer";
import { calculateDailyScores } from "./calcProbScores.js";
import { User } from "../models/user.js";

// Fetch 3 random problems for the day
const getDailyProblems = async (sub) => {
  const today = new Date().toLocaleDateString("en-CA");
  let user = await Daily.findOne({ auth0Id:sub });
  if(!user){
    user = await Daily.create({ auth0Id:sub, daily:[] });
  }
  let daily = (user.daily || []).find((day) => new Date(day.date).toLocaleDateString("en-CA") === today);
  // console.log(daily);
  if (!daily) {
    const randomProblems = await calculateDailyScores(sub);
    const mcqsForDay = await MCQ.aggregate([{ $sample: { size: 3 } }]);

    daily = {
      date: today,
      problems: randomProblems,
      mcqs: mcqsForDay,
    };
    await Daily.findOneAndUpdate(
      { auth0Id:sub },
      { $push: { daily: daily } },
      { upsert: true }
    );
  }
  // console.log(daily);
  return daily;
};

// Get the MCQs and problems for the day
async function getDaily(req, res) {
  try {
    const { sub } = req.auth.payload;
    // console.log("sub is = ", sub);
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

async function updatePotdStreak(req, res) {
  const { sub, mcqsSolved, problemsSolved } = req.body;

  try {
    const user = await User.findOne({ auth0Id:sub });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const today = new Date().toLocaleDateString("en-CA");
    const streak = user.potdStreak;
    const lastStreak = streak[streak.length - 1];
    const lastStreakDate = new Date(lastStreak.date).toLocaleDateString("en-CA");
    if (lastStreakDate === today) {
      if (mcqsSolved !== undefined) lastStreak.mcqsSolved = mcqsSolved;
      if (problemsSolved !== undefined) lastStreak.problemsSolved += problemsSolved;
    } else {
      streak.push({
        date: today,
        mcqsSolved: mcqsSolved || 0,
        problemsSolved: problemsSolved || 0
      });
    }
    await user.save();
    res.status(200).send("Streak updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
}

export { getDaily, getMcq ,updatePotdStreak };