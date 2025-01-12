import { Router } from "express";
import { getArticle } from "../controllers/articles.controller.js";

const articleRoute = Router();
articleRoute.get("/:day", getArticle);

export default articleRoute;