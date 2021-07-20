import { ISendMailUseCase } from "./ISendMailUseCase";

import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { ISendMailDTO } from "./ISendMailDTO";

class SendMailUseCase implements ISendMailUseCase {
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
  async execute({ to, subject, variables, path }: ISendMailDTO): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: "Lucas <noreplay@imobe.com.br>",
    });
  }
}

export { SendMailUseCase };
