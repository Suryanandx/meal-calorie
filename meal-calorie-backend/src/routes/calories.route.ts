import { Router } from 'express';
import { getCalorieInfo } from '../controllers/calories.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/get-calories', authenticate, getCalorieInfo);

export default router;
