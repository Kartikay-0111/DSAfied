import { Router } from "express";
import { getProblems,addNote,getNote,toggleSolved,getProblem,getUserProblem} from "../controllers/problems.controller.js";

const problemRoutes = Router();
problemRoutes.get("/problem", getProblems);
problemRoutes.post("/problem/note", addNote);
problemRoutes.get("/problem/note", getNote);
problemRoutes.post("/problem/toggleSolved", toggleSolved);
problemRoutes.get("/problem/:id", getProblem);
problemRoutes.get("/userproblem", getUserProblem);
problemRoutes
export default problemRoutes;
