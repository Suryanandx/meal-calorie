import { Router } from "express";
import { getCalorieInfo } from "../controllers/calories.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { calorieRequestSchema } from "../validators/calories.schema";
import { userRateLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

router.post(
    '/get-calories',
    authenticate,
    userRateLimiter, 
    validateBody(calorieRequestSchema),
    getCalorieInfo
  );

export default router;
