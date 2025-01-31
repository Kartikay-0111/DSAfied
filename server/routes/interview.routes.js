import express from "express";
import {getInterviewProblems} from "../controllers/interview.controller.js";

const interviewRoutes = express.Router();

interviewRoutes.get("/", getInterviewProblems);


export default interviewRoutes;