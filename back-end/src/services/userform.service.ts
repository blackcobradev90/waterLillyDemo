import { PrismaClient } from '../generated/prisma';
import { UserForm } from '../generated/prisma';

const prisma = new PrismaClient();

export const createUserForm = async (userFormData: any) => {
  const {
    firstName,
    lastName,
    email,
    address,
    phone,
    postCode,
    gender,
    birthday,
    expectedIncome,
    pregnantOrAdopting,
    coverage,
    tobaccoUser,
    majorMedicalCondition,
  } = userFormData;

  const userForm = await prisma.userForm.create({
    data: {
      firstName,
      lastName,
      email,
      address,
      phone,
      postCode,
      gender,
      birthday,
      expectedIncome,
      pregnantOrAdopting,
      coverage,
      tobaccoUser,
      majorMedicalCondition,
    },
  });

  return userForm;
};
