import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const createUserUseCase = new CreateUserUseCase(userRepository);

    const { name, phone, email, password } = request.body;

    try {
      const user = await createUserUseCase.execute(
        name,
        phone,
        email,
        password
      );

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new CreateUserController();
