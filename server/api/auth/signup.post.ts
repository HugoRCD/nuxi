import { H3Event } from "h3";
import { createUserInput } from "~/types/user";
import { createUser } from "~/server/app/userService";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const createUserInput: createUserInput = {
    username: body.username,
    password: body.password,
    email: body.email,
  };
  return await createUser(createUserInput);
});
