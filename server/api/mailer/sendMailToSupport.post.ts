import baseEmailTemplate from "~/server/api/mailer/templates/baseEmail";
import { sendGmail } from "~/server/app/mailerService";
import { H3Event } from "h3";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const { email, subject, message, phone, fullname } = body;
  const template = baseEmailTemplate(subject, email, message, fullname, phone);
  await sendGmail({
    template,
    to: "hrichard206@gmail.com",
    from: email,
    subject: "New message from " + fullname,
  });
  return { statusCode: 200, body: { message: "Email sent" } };
});
