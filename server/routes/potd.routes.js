import { Router } from "express";
import {getDaily,getMcq} from "../controllers/daily.controller.js";

const potdRoutes = Router();
potdRoutes.get("/problems", getDaily);
potdRoutes.get("/mcq/:id", getMcq);
export default potdRoutes;