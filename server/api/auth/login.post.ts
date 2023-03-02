import { H3Event } from "h3";
import { login } from "~/server/app/authService";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const user = await login(body.login, body.password);
  setCookie(event, "authToken", user.authToken as string, {
    httpOnly: true,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return user;
});
