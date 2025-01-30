import { Problem } from "../models/problem.js";
import { User } from "../models/user.js";
import { UserProblem } from "../models/user_problem.js";

async function initializeUserProblems(auth0Id) {
  try {
    // Fetch all problem IDs from the Problem collection
    const problems = await Problem.find({}, "_id");

    const userProblem = await UserProblem.findOne({ auth0Id });

    if (!userProblem) {
      const newUserProblem = new UserProblem({
        auth0Id,
        problems: problems.map((problem) => ({
          id: problem._id.toString(),
          isSolved: false,
          note: null,
          parameters: [],
        })),
      });
      await newUserProblem.save();
    } else {
      problems.forEach((problem) => {
        if (
          !userProblem.problems.some((p) => p.id === problem._id.toString())
        ) {
          userProblem.problems.push({
            id: problem._id.toString(),
            isSolved: false,
            note: null,
            parameters: [],
          });
        }
      });
      await userProblem.save();
    }
    console.log(`Initialized problems for user ${auth0Id}`);
  } catch (error) {
    console.error("Error initializing user problems:", error);
  }
}

async function getDifficultyDetails(auth0Id) {
  try {
    const upbl = await UserProblem.findOne({ auth0Id });
    // console.log(upbl)
    const us = await User.findOne({ auth0Id });
    if (!upbl) {
      return null;
    } else {
      const difficultyMap = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
      };
      const diff_difference_map = {
        0: 1,
        1: 0.5,
        2: 0.3,
      };
      const user_diff_pref = us.difficulty_pref;
      const numeric_user_diff_pref = difficultyMap[user_diff_pref];

      await Promise.all(
        // Iterate through each problem
        upbl.problems.map(async (p, index) => {
          const details = await Problem.findById(p.id);
          const numeric_prob_diff = difficultyMap[details.difficulty];
          // console.log(difficultyMap[details.difficulty])

          const difference = Math.abs(
            numeric_user_diff_pref - numeric_prob_diff
          );
          const numeric_difference = diff_difference_map[difference];
          upbl.problems[index].parameters = [numeric_difference];


          //   await upbl.save();
          // console.log(numeric_difference);
        })
    );
    const updatedDoc = await upbl.save()
    
    return updatedDoc;

    }
  } catch (error) {
    console.error("Error initializing user problems:", error);
  }
}

async function getProblems(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const problems = await Problem.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit)); // Ensure limit is parsed as an integer

    const totalProblems = await Problem.countDocuments();

    return res.status(200).json({
      total: totalProblems, // Corrected from 'total' to 'totalProblems'
      totalPages: Math.ceil(totalProblems / limit),
      currentPage: parseInt(page), // Ensure page is parsed as an integer
      problems,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const addNote = async (req, res) => {
  const { auth0Id, problemId, note } = req.body;
  try {
    const userProblem = await UserProblem.findOne({ auth0Id, problemId });
    if (!userProblem) {
      return res.status(404).json({ message: "User problem not found" });
    }
    userProblem.note = note;
    await userProblem.save();
    return res.status(200).json(userProblem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  const { auth0Id, problemId } = req.query; // Use query parameters for GET request

  try {
    const userProblem = await UserProblem.findOne({ auth0Id, problemId });
    if (!userProblem) {
      return res.status(404).json({ message: "User problem not found" });
    }
    return res.status(200).json({ note: userProblem.note }); // Wrap `note` in an object
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const toggleSolved = async (req, res) => {
  const { auth0Id, problemId } = req.body;
  try {
    const userProblem = await UserProblem.findOne({ auth0Id, problemId });
    if (!userProblem) {
      return res.status(404).json({ message: "User problem not found" });
    }
    userProblem.solved = !userProblem.solved;
    await userProblem.save();
    return res.status(200).json(userProblem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export {
  getProblems,
  addNote,
  getNote,
  initializeUserProblems,
  toggleSolved,
  getDifficultyDetails,
};
