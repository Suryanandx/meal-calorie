import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { RateLimitMiddleware } from '../middlewares/rateLimit.middleware';

const router = Router();
const authController = new AuthController();

router.post('/register', RateLimitMiddleware.ipRateLimiter, authController.registerUser.bind(authController));
router.post('/login', RateLimitMiddleware.ipRateLimiter, authController.loginUser.bind(authController));

export default router;
