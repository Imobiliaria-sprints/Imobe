import { Request, Response } from "express";
import { CrateUserUseCase } from "./CrateUserUseCase";

class CreateUserController {
  async create(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = new CrateUserUseCase();

    const { name, phone, email, password } = request.body;
    try {
      const user = await createUserUseCase.create(name, phone, email, password);

      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new CreateUserController();
