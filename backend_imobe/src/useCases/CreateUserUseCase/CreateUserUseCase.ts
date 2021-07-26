import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { getCustomRepository, Repository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { ICreateUserUseCase } from "../../interfaces/ICreateUserUseCase";
import { resolve } from "path";
import { sendNewEmail } from "../../queue/sendMailQueue";
import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

class CrateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<Record<string, any>> {
    const userAlreadyExists = await this.userRepository.findOneUser(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepository.createUser({
      name,
      phone,
      email,
      password: passwordHash,
    });

    const variables = {
      name: (await user).name,
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
      to: (await user).email,
      subject: "Conta criada com sucesso!",
      variables,
      path: createUserPath,
    };

    await sendNewEmail(userMail);

    return classToPlain(user);
  }
}

export { CrateUserUseCase };
