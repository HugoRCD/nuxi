import { LinearClient } from "@linear/sdk";

const linearApiKey = useRuntimeConfig().private.apiKey;

const linearClient = new LinearClient({
  apiKey: linearApiKey,
});

const helprTeamId = "34b08c67-0366-4cc0-8a32-07d481c045f1";

import { H3Event } from "h3";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { email, message, ticket_type, phone, fullname } = body;
  await linearClient.createIssue({
    title: `Support Request: ${fullname}`,
    description: `
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
    teamId: helprTeamId,
    labelIds: [ticket_type],
  });
  return {
    statusCode: 200,
    body: "OK",
  };
});
