import { Request, Response } from "express";
import { CreateUserAuthenticateUseCase } from "./CreateUserAuthenticateUseCase";

class CreateUserAuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserAuthenticationUseCase = new CreateUserAuthenticateUseCase();

    try {
      const { token, user, refreshToken } =
        await createUserAuthenticationUseCase.execute(email, password);

      return response.json({ token, user, refreshToken });
    } catch (error) {
      return response.status(401).json({ message: error });
    }
  }
}

export default new CreateUserAuthenticateController();
