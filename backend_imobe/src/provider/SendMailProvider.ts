import { ISendMailProvider } from "../interfaces/ISendMailProvider";

import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { ISendMailDTO } from "../dtos/ISendMailDTO";

class SendMailProvider implements ISendMailProvider {
  private client: Transporter;
  key = "SendMail";

  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    this.client = transporter;
  }

  /**
   * @Lucas-Duarte-dev
   *
   * @param {Object} ISendMailDTO - Interface with all the params necessaty for send a new e-mail
   * @param {string} to
   * @param {string} subject
   * @param {Object} variables
   * @param {path} string
   */
  async execute({ to, subject, variables, path }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    await this.client.sendMail({
      to,
      subject,
      html,
      from: "Lucas <noreplay@imobe.com.br>",
    });
  }
}

export { SendMailProvider };
