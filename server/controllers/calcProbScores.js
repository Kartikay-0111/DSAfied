import cron from "node-cron";
import { UserProblem } from "../models/user_problem.js";

export const calculateDailyScores = async (auth0Id) => {
  // console.log(Function called at night: ${new Date().toLocaleString()});
  try {
    const upbl = await UserProblem.findOne({ auth0Id });
    if (!upbl) {
      console.log("UserProblem not found");
      return;
    } else {
      const diff_scores = [];
      await Promise.all(
        upbl.problems.map(async (p, index) => {
          const obj = {
            p_id: p.id,
            DIFFICULTY_MATCH: p.parameters[0],
          };
          diff_scores.push(obj);
        })
      );
      // console.log(diff_scores);
      const top3Problems = diff_scores
      .sort((a, b) => b.DIFFICULTY_MATCH - a.DIFFICULTY_MATCH)
      .slice(0, 3)
      .map((problem) => ({ _id: problem.p_id }));

    console.log("TOP 3 problem IDs: ", top3Problems);
    return top3Problems;
    }
  } catch (error) {
    console.error("Error calculating scores:", error);
  }
};


export default { calculateDailyScores }