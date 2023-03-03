
import prisma, { formatUser } from "~/server/database/client";
import { createUserInput, updateUserInput } from "~/types/user";
import bcrypt from "bcrypt";
import { sendGmail } from "~/server/app/mailerService";
import newUser from "~/server/api/mailer/templates/new-user";
import { generateEmailVerificationToken } from "~/server/app/authService";

export async function createUser(createUserInput: createUserInput) {
  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: createUserInput.username,
        },
        {
          email: createUserInput.email,
        },
      ],
    },
  });
  if (foundUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "user_already_exists",
    });
  }
  const password = await bcrypt.hash(createUserInput.password, 10);
  const user = await prisma.user.create({
    data: {
      username: createUserInput.username,
      email: createUserInput.email,
      password,
    },
  });
  const token = await generateEmailVerificationToken(user.id);
  const appDomain = useRuntimeConfig().public.appDomain;
  const url = `${appDomain}/verify/user?token=${token}`;
  await sendGmail({
    template: newUser(user.email, url),
    to: user.email,
    from: useRuntimeConfig().mailerUser,
    subject: "Verify your email",
  });
  return formatUser(user);
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "user_not_found",
    });
  }
  return formatUser(user);
}

export async function getUserByLogin(login: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: login,
        },
        {
          email: login,
        },
      ],
    },
  });
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "user_not_found",
    });
  }
  return user;
}

export async function updateUser(userId: number, updateUserInput: updateUserInput) {
  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: updateUserInput.username,
        },
        {
          email: updateUserInput.email,
        },
      ],
    },
  });
  if (foundUser && foundUser.id !== userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "username_or_email_already_exists",
    });
  }
  const user = await prisma.user.update({
    where: { id: userId },
    data: updateUserInput,
  });
  return formatUser(user);
}

export async function deleteUser(userId: number) {
  const user = await prisma.user.delete({
    where: { id: userId },
  });
  return formatUser(user);
}