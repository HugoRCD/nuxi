import { H3Event } from "h3";

export default eventHandler(async (event: H3Event) => {
  deleteCookie(event, "authToken");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Logged out" }),
  };
});
