import { Router } from 'express';
import { createUser, edit_profile } from '../controllers/user.controller.js';
import { User } from '../models/user.js';
const router = Router();

router.get('/', async (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
router.get('/profile/:id', edit_profile)
router.post('/', createUser);

export default router;