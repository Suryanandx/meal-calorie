import { Request, Response } from "express";
import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

// Utility to send consistent API error responses
const sendError = (res: Response, status: number, message: string) => {
  res.status(status).json({ success: false, error: message });
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      sendError(res, 400, "All fields (first_name, last_name, email, password) are required");
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      sendError(res, 409, "Email is already registered. Try logging in instead.");
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    sendError(res, 500, "Something went wrong while creating the account. Please try again later.");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, 400, "Both email and password are required");
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      sendError(res, 401, "Invalid email or password");
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      sendError(res, 401, "Invalid email or password");
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    sendError(res, 500, "Something went wrong while logging in. Please try again later.");
  }
};
