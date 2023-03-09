import { H3Event } from "h3";
import { deleteUser } from "~/server/app/userService";

export default eventHandler(async (event: H3Event) => {
  const userId = parseInt(event.context.params.userId);
  await deleteUser(userId);
  return {
    statusCode: 200,
    message: "User deleted",
  };
});
