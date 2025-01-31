import { Router } from "express";
import { getUser, getUserById, updateUser } from "../controllers/user.controller.js";

const router = Router();

// Fetch a user by ID
// router.get("/:id", getUserById);

// Update user profile
router.put("/:id", updateUser);

router.get("/", getUser);

export default router;
