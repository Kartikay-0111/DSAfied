import { Router } from "express";
import {getDailymcqs} from "../controllers/daily.controller.js";

const potdRoutes = Router();
potdRoutes.get("/problems", getDailymcqs);

export default potdRoutes;