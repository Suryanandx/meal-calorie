import { User } from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export interface IAuthService {
  registerUser(data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }>;

  loginUser(data: { email: string; password: string }): Promise<{
    token: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
    };
  }>;
}

export class AuthService implements IAuthService {
  public async registerUser(data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }) {
    const { first_name, last_name, email, password } = data;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new Error("EMAIL_EXISTS");
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    return {
      id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
  }

  public async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const token = generateToken(user._id.toString());

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
