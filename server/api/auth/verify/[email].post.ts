import { H3Event } from "h3";
import { getEmailVerificationByToken, verifyEmail } from "~/server/app/authService";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const token = body.token;
  const userId = await getEmailVerificationByToken(token);
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "invalid_code",
    });
  }
  await verifyEmail(userId);
  return { statusCode: 200, body: { message: "email_verified" } };
});
