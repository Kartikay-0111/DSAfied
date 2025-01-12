import { Problem } from "../models/problem.js";

async function getProblems(req, res) {
    try{
        const problems = await Problem.find({});
        // console.log(problems);
        return res.status(200).json(problems);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export { getProblems };