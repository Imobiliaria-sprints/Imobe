import { Request, Response } from "express";
import { CrateUserUseCase } from "./CrateUserUseCase";
import { resolve } from "path";
import { sendNewEmail } from "../../queue/sendMailQueue";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createUserUseCase = new CrateUserUseCase();

    const { name, phone, email, password } = request.body;
    try {
      const user = await createUserUseCase.execute(
        name,
        phone,
        email,
        password
      );

      const variables = {
        name: user.name,
      };

      const createUserPath = resolve(
        __dirname,
        "..",
        "..",
        "views",
        "emails",
        "userCreated.hbs"
      );

      const userMail = {
        to: user.email,
        subject: "Conta criada com sucesso!",
        variables,
        path: createUserPath,
      };

      await sendNewEmail(userMail);

      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new CreateUserController();
