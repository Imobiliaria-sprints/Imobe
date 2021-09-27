import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

import { ICreateUserUseCase } from "./ICreateUserUseCase";

import { IUserRepository } from "@repos/IUserRepository";

class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(
    name: string,
    phone: string,
    email: string,
    password: string,
    admin?: boolean,
    avatar?: string
  ): Promise<Record<string, any>> {
    const userAlreadyExists = await this.userRepository.findOneUserByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepository.createUser({
      name,
      avatar,
      phone,
      email,
      admin,
      password: passwordHash,
    });

    // const variables = {
    //   name: (await user).name,
    // };

    // const createUserPath = resolve(
    //   __dirname,
    //   "..",
    //   "..",
    //   "views",
    //   "emails",
    //   "userCreated.hbs"
    // );

    // const userMail = {
    //   to: (await user).email,
    //   subject: "Conta criada com sucesso!",
    //   variables,
    //   path: createUserPath,
    // };

    // await sendNewEmail(userMail);

    return classToPlain(user);
  }
}

export { CreateUserUseCase };
