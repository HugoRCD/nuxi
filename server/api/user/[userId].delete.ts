import { H3Event } from "h3";
import { deleteUser } from "~/server/app/userService";

export default eventHandler(async (event: H3Event) => {
  const userId = parseInt(event.context.params.userId);
  return await deleteUser(userId);
});
