import { Router } from "express";
import { getProblems } from "../controllers/problems.controller.js";

const problemRoutes = Router();
problemRoutes.get("/", getProblems);

export default problemRoutes;
