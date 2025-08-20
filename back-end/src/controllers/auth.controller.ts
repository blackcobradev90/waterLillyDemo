import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await authService.signup(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
