import { Problem } from "../models/problem.js";
import { UserProblem } from "../models/user_problem.js";

async function initializeUserProblems(auth0Id) {
    try {
        // Fetch all problem IDs from the Problem collection
        const problems = await Problem.find({}, '_id');

        const bulkOps = problems.map(problem => ({
            updateOne: {
                filter: { auth0Id, problemId: problem._id },
                update: { $setOnInsert: { auth0Id, problemId: problem._id, parameters: [], solved: false, note: null } },
                upsert: true, // Create a new entry if it doesn't exist
            }
        }));

        // Execute bulk write operation
        if (bulkOps.length > 0) {
            await UserProblem.bulkWrite(bulkOps);
        }
        console.log(`Initialized problems for user ${auth0Id}`);
    } catch (error) {
        console.error('Error initializing user problems:', error);
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
            problems
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addNote = async (req,res) => {
    const {auth0Id, problemId, note } = req.body;
    try {
        const userProblem = await UserProblem.findOne({ auth0Id, problemId });
        if (!userProblem) {
            return res.status(404).json({ message: "User problem not found" });
        }
        userProblem.note = note;
        await userProblem.save();
        return res.status(200).json(userProblem);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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
const toggleSolved = async (req,res) => {
    const {auth0Id, problemId } = req.body;
    try {
        const userProblem = await UserProblem.findOne({ auth0Id, problemId });
        if (!userProblem) {
            return res.status(404).json({ message: "User problem not found" });
        }
        userProblem.solved = !userProblem.solved;
        await userProblem.save();
        return res.status(200).json(userProblem);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export { getProblems ,addNote , getNote, initializeUserProblems,toggleSolved };
