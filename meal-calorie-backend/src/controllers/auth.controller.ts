import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

    const hashed = await hashPassword(password);
    const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: 'User registered',
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'Invalid email or password' });
      return;
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
