import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { ICreateUserUseCase } from "./ICreateUserUseCase";

class CrateUserUseCase implements ICreateUserUseCase {
  async execute(
    name: string,
    phone: string,
    email: string,
    password: string
  ): Promise<Record<string, any>> {
    const userRepository = getCustomRepository(UserRepository);
    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      phone,
      email,
      password: passwordHash,
    });

    await userRepository.save(user);

    return classToPlain(user);
  }
}

export { CrateUserUseCase };
