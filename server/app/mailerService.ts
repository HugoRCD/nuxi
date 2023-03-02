import { useMailer } from "#mailer";

export type EmailTemplate = {
  text: string;
  html: string;
};

type Mail = {
  template: EmailTemplate;
  to: string;
  from: string;
  subject: string;
};

export async function sendGmail(request: Mail) {
  const mailService = useMailer();
  const gmailTransporter = mailService.gmailTransporter();
  return await mailService.sendMail({
    requestId: Math.random().toString(36).substring(7),
    options: {
      to: request.to,
      subject: request.subject,
      text: request.template.text,
      html: request.template.html,
    },
    transporter: gmailTransporter,
  });
}
