import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "@repos/factory/UserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import renderUser from "../../utils/renderUser";
class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const createUserUseCase = new CreateUserUseCase(userRepository);

    const { name, phone, email, password, admin = false } = request.body;
    const requestFile = request?.file as Express.Multer.File;

    const avatar = requestFile.filename;

    try {
      const user = await createUserUseCase.execute(
        name,
        phone,
        email,
        password,
        admin,
        avatar
      );

      return response.json(renderUser.render(user));
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: error.message });
    }
  }
}

export { CreateUserController };
