import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, token, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);

    await resetPasswordUseCase.execute(email, token, password);

    return response.json();
  }
}

export default new ResetPasswordController();
