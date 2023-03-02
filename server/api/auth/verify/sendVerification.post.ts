import { H3Event } from "h3";
import { getUserByLogin } from "~/server/app/userService";
import { generateEmailVerificationToken } from "~/server/app/authService";
import { sendGmail } from "~/server/app/mailerService";
import newUser from "~/server/api/mailer/templates/new-user";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const user = await getUserByLogin(body.email);
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: "user_not_found",
    });
  }
  const token = await generateEmailVerificationToken(user.id);
  const appDomain = useRuntimeConfig().public.appDomain;
  const url = `${appDomain}/verify/user?token=${token}`;
  await sendGmail({
    template: newUser(user.email, url),
    to: user.email,
    from: useRuntimeConfig().mailerUser,
    subject: "Verify your email",
  });
  return { statusCode: 200, body: { message: "email_sent" } };
});
