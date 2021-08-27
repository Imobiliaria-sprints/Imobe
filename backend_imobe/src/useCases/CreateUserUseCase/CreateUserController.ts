import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "@repos/factory/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const createUserUseCase = new CreateUserUseCase(userRepository);

    const { name, phone, email, password } = request.body;
    const requestFile = request.file as Express.Multer.File;

    const avatar = requestFile.filename;

    try {
      const user = await createUserUseCase.execute(
        name,
        phone,
        email,
        password,
        avatar
      );

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new CreateUserController();
