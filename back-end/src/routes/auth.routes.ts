import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { z } from 'zod';

const router = Router();

const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.number().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', validate(loginSchema), authController.login);

export default router;
