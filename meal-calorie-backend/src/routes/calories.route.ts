import { Router } from "express";
import { CalorieController } from "../controllers/calories.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ValidationMiddleware } from "../middlewares/validate.middleware";
import { calorieRequestSchema } from "../validators/calories.schema";
import { RateLimitMiddleware } from "../middlewares/rateLimit.middleware";

const router = Router();
const controller = new CalorieController();

router.post(
  "/get-calories",
  AuthMiddleware.authenticate,
  RateLimitMiddleware.userRateLimiter,
  ValidationMiddleware.validateBody(calorieRequestSchema),
  controller.getCalorieInfo.bind(controller)
);

export default router;
