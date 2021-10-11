import { UserRepository } from "../../repositories/factory/UserRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ListAllUserUseCase } from "./ListAllUserUseCase";
import userRender from "../../../../utils/renderUser";

class ListAllUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const listAllUserUseCase = new ListAllUserUseCase(userRepository);

    const user = await listAllUserUseCase.execute();

    return response.json(userRender.renderMany(user));
  }
}

export { ListAllUserController };
