import { Request, Response } from "express";
import { CreateUserAuthenticateUseCase } from "./CreateUserAuthenticateUseCase";
import renderUser from "../../utils/renderUser";

class CreateUserAuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createUserAuthenticationUseCase = new CreateUserAuthenticateUseCase();

    try {
      const { token, authuser, refreshToken } =
        await createUserAuthenticationUseCase.execute(email, password);
      const user = renderUser.render(authuser);
      return response.json({ token, user, refreshToken });
    } catch (error) {
      return response.status(401).json({ message: error });
    }
  }
}

export default new CreateUserAuthenticateController();
