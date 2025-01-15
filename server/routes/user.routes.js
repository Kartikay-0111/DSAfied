import { Router } from 'express';
import { createUser,checkUser, getUserById } from '../controllers/user.controller.js';
import multer from 'multer';
const router = Router();

const upload = multer({storage: multer.memoryStorage()});    //multer mdlware to store file and get form data *

userRoutes.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
router.post('/', upload.single("avatar"), createUser);

router.post('/check-user', checkUser);
export default router;