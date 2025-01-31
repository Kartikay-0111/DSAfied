import { Router } from "express";
import { getProblems,getuserProblems,addNote,getNote,toggleSolved,getProblem,getUserProblem} from "../controllers/problems.controller.js";

const problemRoutes = Router();
problemRoutes.get("/userproblem", getuserProblems);
problemRoutes.get("/problem", getProblems);
problemRoutes.post("/problem/note", addNote);
problemRoutes.get("/problem/note", getNote);
problemRoutes.post("/problem/toggleSolved", toggleSolved);
problemRoutes.get("/problem/:id", getProblem);
problemRoutes.get("/userproblem", getUserProblem);

export default problemRoutes;
