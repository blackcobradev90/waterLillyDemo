import { PrismaClient } from '../generated/prisma';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';

const prisma = new PrismaClient();

export const signup = async (userData: any) => {
  const { name, email, password, age } = userData;
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      age,
    },
  });
  return user;
};

export const login = async (credentials: any) => {
  const { email, password } = credentials;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, email: user.email });
  return { user, token };
};
