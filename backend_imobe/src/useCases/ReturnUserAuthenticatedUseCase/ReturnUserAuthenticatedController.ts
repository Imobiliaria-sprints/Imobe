import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { ReturnUserAuthenticatedUseCase } from "./ReturnUserAuthenticatedUseCase";

class ReturnUserAuthenticatedController {
  /**
   * @Lucas-Duarte-dev
   *
   * @param {Request} request
   * @param {Response} response
   * @returns Response
   */
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const userRepository = getCustomRepository(UserRepository);

    const returnUserAuthenticatedUseCase = new ReturnUserAuthenticatedUseCase(
      userRepository
    );

    const user = await returnUserAuthenticatedUseCase.execute(user_id);

    return response.json({ user });
  }
}

export default new ReturnUserAuthenticatedController();
