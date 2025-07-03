import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { ipRateLimiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post('/register', ipRateLimiter, registerUser);
router.post('/login', ipRateLimiter, loginUser);

export default router;
