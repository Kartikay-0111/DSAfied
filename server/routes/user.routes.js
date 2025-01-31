import { Router } from "express";
import { getUser, updateUser,checkUser } from "../controllers/user.controller.js";

import multer from 'multer';
const userRoutes = Router();

const upload = multer({storage: multer.memoryStorage()});    //multer mdlware to store file and get form data *

userRoutes.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
userRoutes.post('/', upload.single("avatar"), createUser);

// Update user profile
userRoutes.put("/:id", updateUser);

userRoutes.get("/", getUser);

userRoutes.post('/check-user', checkUser);
export default userRoutes;
