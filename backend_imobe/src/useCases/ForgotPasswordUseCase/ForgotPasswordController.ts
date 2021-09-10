import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SendMailProvider } from "../../provider/SendMailProvider";
import { UserRepository } from "@repos/factory/UserRepository";
import { ForgotPasswordUseCase } from "./ForgotPasswordUseCase";

class ForgotPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const sendMailProvider = new SendMailProvider();

    const forgotPasswordUseCase = new ForgotPasswordUseCase(
      sendMailProvider,
      userRepository
    );

    await forgotPasswordUseCase.execute(email);

    return response.json();
  }
}

export { ForgotPasswordController };
