import { Router } from 'express';
import { createUser, checkUser, updateStreak, getStreak, getUserById } from '../controllers/user.controller.js';
import multer from 'multer';
const userRoutes = Router();

const upload = multer({ storage: multer.memoryStorage() }); // multer middleware to store file and get form data

userRoutes.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
userRoutes.post('/', upload.single("avatar"), createUser);
userRoutes.post('/check-user', checkUser);
userRoutes.post('/updateStreak', updateStreak);
userRoutes.get('/streak', getStreak);

export default userRoutes;