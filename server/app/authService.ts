import prisma, { formatUser } from "~/server/database/client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { getUserById, getUserByLogin } from "~/server/app/userService";
import jwt from "jsonwebtoken";

async function setAuthToken(userId: number) {
  const user = await getUserById(userId);
  const authToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    useRuntimeConfig().private.authSecret,
    { expiresIn: useRuntimeConfig().private.authExpiration },
  );
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      authToken,
    },
  });
  return formatUser(updatedUser);
}

export async function login(login: string, password: string) {
  const user = await getUserByLogin(login);
  if (!user) throw createError({ statusCode: 404, message: "user_not_found" });
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createError({ statusCode: 401, message: "invalid_password" });
  }
  return await setAuthToken(user.id);
}

export async function getUserByAuthToken(authToken: string) {
  const user = await prisma.user.findUnique({
    where: {
      authToken,
    }
  });
  if (!user) return null;
  return formatUser(user);
}

export async function generateResetPasswordToken(userId: number) {
  const token = Math.random().toString(36).substr(2);
  await prisma.resetPassword.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      token: token,
    },
    update: {
      token: token,
    },
  });
  return token;
}

export async function generateEmailVerificationToken(userId: number) {
  const token = Math.random().toString(36).substr(2);
  await prisma.emailVerification.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      token,
    },
    update: {
      token,
    },
  });
  return token;
}

export async function updatePassword(userId: number, password: string) {
  const user = (await getUserById(userId)) as User;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  await prisma.resetPassword.delete({
    where: {
      userId: updatedUser.id,
    },
  });
  return updatedUser;
}

export async function getResetPasswordByToken(token: string) {
  const resetPassword = await prisma.resetPassword.findFirst({
    where: {
      token,
    },
  });
  if (!resetPassword) return null;
  return resetPassword.userId;
}

export async function getEmailVerificationByToken(token: string) {
  const emailVerification = await prisma.emailVerification.findFirst({
    where: {
      token,
    },
  });
  if (!emailVerification) return null;
  return emailVerification.userId;
}

export async function verifyEmail(userId: number) {
  const user = (await getUserById(userId)) as User;
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
    },
  });
  await prisma.emailVerification.delete({
    where: {
      userId: updatedUser.id,
    },
  });
  return updatedUser;
}
