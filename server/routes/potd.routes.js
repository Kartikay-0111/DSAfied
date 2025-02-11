import { Router } from "express";
import {getDaily,getMcq,updatePotdStreak} from "../controllers/daily.controller.js";

const potdRoutes = Router();
potdRoutes.get("/problems", getDaily);
potdRoutes.get("/mcq/:id", getMcq);
potdRoutes.post("/updatepotdStreak", updatePotdStreak);

export default potdRoutes;