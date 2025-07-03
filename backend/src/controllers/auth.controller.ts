import { Request, Response } from "express";
import { authService } from "../services/AuthService";

export class AuthController {
  private sendError(res: Response, status: number, message: string): void {
    res.status(status).json({ success: false, error: message });
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password) {
        this.sendError(
          res,
          400,
          "All fields (first_name, last_name, email, password) are required"
        );
        return;
      }

      const user = await authService.registerUser({
        first_name,
        last_name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user,
      });
    } catch (err) {
      console.error("Registration Error:", err);
      if (err instanceof Error && err.message === "EMAIL_EXISTS") {
        this.sendError(
          res,
          409,
          "Email is already registered. Try logging in instead."
        );
      } else {
        this.sendError(
          res,
          500,
          "Something went wrong while creating the account."
        );
      }
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        this.sendError(res, 400, "Both email and password are required");
        return;
      }

      const { token, user } = await authService.loginUser({ email, password });

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user,
      });
    } catch (err) {
      console.error("Login Error:", err);
      if (err instanceof Error && err.message === "INVALID_CREDENTIALS") {
        this.sendError(res, 401, "Invalid email or password");
      } else {
        this.sendError(res, 500, "Something went wrong while logging in.");
      }
    }
  }
}
