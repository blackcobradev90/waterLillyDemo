import { Request, Response } from 'express';
import * as userFormService from '../services/userform.service';

export const createUserForm = async (req: Request, res: Response) => {
  try {
    const userForm = await userFormService.createUserForm(req.body);
    res.status(201).json({ userForm });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user form' });
  }
};
