import { Sheet } from "../models/interview.js";

export const getInterviewProblems = async (req, res) => {
    try {
        const sheetData = await Sheet.find();
        res.status(200).json(sheetData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
