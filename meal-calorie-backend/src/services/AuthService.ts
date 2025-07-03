import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";
import { logger } from "../utils/logger";

interface RegisterUserInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

interface AuthenticatedUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IAuthService {
  registerUser(data: RegisterUserInput): Promise<AuthenticatedUser>;
  loginUser(
    data: LoginUserInput
  ): Promise<{ token: string; user: AuthenticatedUser }>;
}

export class AuthService implements IAuthService {
  public async registerUser(
    data: RegisterUserInput
  ): Promise<AuthenticatedUser> {
    const { first_name, last_name, email, password } = data;

    const existing = await User.findOne({ email });
    if (existing) {
      logger.warn({ email }, "Attempt to register with existing email");
      throw new Error("EMAIL_EXISTS");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    logger.info({ userId: user._id, email }, "User registered successfully");

    return {
      id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }

  public async loginUser(
    data: LoginUserInput
  ): Promise<{ token: string; user: AuthenticatedUser }> {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn({ email }, "Login failed: user not found");
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      logger.warn({ email }, "Login failed: invalid password");
      throw new Error("INVALID_CREDENTIALS");
    }

    const token = generateToken(user._id.toString());

    logger.info({ userId: user._id, email }, "User logged in successfully");

    return {
      token,
      user: {
        id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    };
  }
}

export const authService = new AuthService();
