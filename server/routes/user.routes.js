import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';
const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'Server is up and running!' });
});
router.post('/', createUser);

export default router;