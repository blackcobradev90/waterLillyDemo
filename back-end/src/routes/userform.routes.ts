import { Router } from 'express';
import * as userFormController from '../controllers/userform.controller';
import { validate } from '../middlewares/validate.middleware';
import { z } from 'zod';

const router = Router();

const userFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  postCode: z.string(),
  gender: z.string(),
  birthday: z.string().datetime(),
  expectedIncome: z.enum(['LESS_THAN_50K', 'BETWEEN_50K_100K', 'ABOVE_100K']),
  pregnantOrAdopting: z.boolean(),
  coverage: z.enum(['MYSELF', 'FAMILY']),
  tobaccoUser: z.boolean(),
  majorMedicalCondition: z.boolean(),
});

router.post('/', validate(userFormSchema), userFormController.createUserForm);

export default router;
