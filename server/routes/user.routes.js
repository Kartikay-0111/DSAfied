import { Router } from 'express';
import { createUser,checkUser, getUserById } from '../controllers/user.controller.js';
import multer from 'multer';

const userRoutes = Router();


const upload = multer({storage: multer.memoryStorage()});    //multer mdlware to store file and get form data *

userRoutes.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
userRoutes.post('/', upload.single("avatar"), createUser);

userRoutes.post('/check-user', checkUser);
export default userRoutes;
