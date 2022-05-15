import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from "nodemailer";
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f15230b3310ccc",
    pass: "a8f35fa85a9898",
  },
});
export class NodemailerAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <victor@nodemailer.com>",
      to: "Victor Hugo <viktorstteffens@gmail.com>",
      subject,
      html: body
    });
  }
}
