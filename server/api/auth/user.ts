import { H3Event } from "h3";
import { isString } from "@vueuse/core";
import { getUserByAuthToken } from "~/server/app/authService";

export default eventHandler(async (event: H3Event) => {
  const authToken = getCookie(event, "authToken");
  const hasAuthToken = isString(authToken);
  if (!hasAuthToken) return null;
  const user = await getUserByAuthToken(authToken);
  if (!user) return null;
  return user;
});
