import { Router } from "express";
import { getUser, getUserById, updateUser,checkUser, getUserById } from "../controllers/user.controller.js";

import multer from 'multer';
const userRoutes = Router();

const upload = multer({storage: multer.memoryStorage()});    //multer mdlware to store file and get form data *

userRoutes.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
userRoutes.post('/', upload.single("avatar"), createUser);
// Fetch a user by ID
// router.get("/:id", getUserById);

// Update user profile
router.put("/:id", updateUser);

router.get("/", getUser);

userRoutes.post('/check-user', checkUser);
export default userRoutes;
