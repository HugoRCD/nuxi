import { H3Event } from "h3";
import { login } from "~/server/app/authService";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  return await login(body.login, body.password);
});
