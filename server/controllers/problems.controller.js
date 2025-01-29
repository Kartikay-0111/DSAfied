import { Problem } from "../models/problem.js";
import { UserProblem } from "../models/user_problem.js";

async function initializeUserProblems(auth0Id) {
    try {
        // Fetch all problem IDs from the Problem collection
        const problems = await Problem.find({}, '_id');

        const userProblem = await UserProblem.findOne({ auth0Id });

        if (!userProblem) {
            const newUserProblem = new UserProblem({
                auth0Id,
                problems: problems.map(problem => ({
                    id: problem._id.toString(),
                    isSolved: false,
                    note: null,
                    parameters: []
                }))
            });
            await newUserProblem.save();
        } else {
            problems.forEach(problem => {
                if (!userProblem.problems.some(p => p.id === problem._id.toString())) {
                    userProblem.problems.push({
                        id: problem._id.toString(),
                        isSolved: false,
                        note: null,
                        parameters: []
                    });
                }
            });
            await userProblem.save();
        }

        console.log(`Initialized problems for user ${auth0Id}`);
    } catch (error) {
        console.error('Error initializing user problems:', error);
    }
}
async function getProblem(req, res) {
    const { id } = req.params;
    // console.log(id);
    try {
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        return res.status(200).json(problem);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

const addNote = async (req, res) => {
    const { auth0Id, problemId, note } = req.body;
    try {
        const userProblem = await UserProblem.findOne({ auth0Id });
        if (!userProblem) {
            return res.status(404).json({ message: "User problem not found" });
        }
        const problem = userProblem.problems.find(p => p.id.toString() === problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        problem.note = note;
        await userProblem.save();
        return res.status(200).json(userProblem);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getNote = async (req, res) => {
    const { auth0Id, problemId } = req.query; // Use query parameters for GET request

    try {
        const userProblem = await UserProblem.findOne({ auth0Id });
        if (!userProblem) {
            return res.status(404).json({ message: "User problem not found" });
        }
        const problem = userProblem.problems.find(p => p.id.toString() === problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        return res.status(200).json({ note: problem.note }); // Wrap `note` in an object
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const toggleSolved = async (req, res) => {
    const { auth0Id, problemId } = req.body;
    try {
        const userProblem = await UserProblem.findOne({ auth0Id });
        if (!userProblem) {
            return res.status(404).json({ message: "User problem not found" });
        }
        const problem = userProblem.problems.find(p => p.id.toString() === problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        problem.solvedstatus = !problem.solvedstatus;
        await userProblem.save();
        return res.status(200).json(userProblem);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUserProblem = async (req, res) => {
    const { auth0Id, problemId } = req.query; // Use query parameters for GET request

    try {
        const userProblem = await UserProblem.findOne({ auth0Id });
        if (!userProblem) {
            return res.status(404).json({ message: "User problem not found" });
        }
        const problem = userProblem.problems.find(p => p.id.toString() === problemId);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        return res.status(200).json(problem);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export { getProblems ,addNote , getNote, initializeUserProblems,toggleSolved ,getProblem,getUserProblem};
