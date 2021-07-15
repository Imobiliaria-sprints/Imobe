import { Request, Response } from "express";
import { CreateUserAuthenticateUseCase } from "./CreateUserAuthenticateUseCase";

class CreateUserAuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserAuthenticationUseCase = new CreateUserAuthenticateUseCase();

    try {
      const token = await createUserAuthenticationUseCase.execute(
        email,
        password
      );

      return response.status(201).json({ token: token });
    } catch (error) {
      return response.status(401).json({ message: error });
    }
  }
}

export default new CreateUserAuthenticateController();
