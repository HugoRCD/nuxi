import { H3Event } from "h3";
import { isString } from "@vueuse/core";
import { getUserByAuthToken } from "~/server/app/authService";

export default eventHandler(async (event) => {
  const isAllowed = await protectAuthRoute(event);

  if (!isAllowed) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "unauthorized",
      }),
    );
  }
});

async function protectAuthRoute(event: H3Event): Promise<boolean> {
  const protectedRoutes = ["/api/admin", "/api/user"];

  if (event.path === undefined || !protectedRoutes.some((route) => event.path?.startsWith(route))) {
    return true;
  } else {
    const authToken = getCookie(event, "authToken");
    const hasAuthToken = isString(authToken);
    if (!hasAuthToken) return false;
    const user = await getUserByAuthToken(authToken);
    if (!user) return false;
  }
  return true;
}
