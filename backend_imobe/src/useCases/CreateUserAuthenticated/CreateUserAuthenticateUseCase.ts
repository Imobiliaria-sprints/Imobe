import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { ICreateUserAuthenticateUseCase } from "../../interfaces/ICreateUserAuthenticateUseCase";
import { classToPlain } from "class-transformer";

class CreateUserAuthenticateUseCase implements ICreateUserAuthenticateUseCase {
  async execute(
    email: string,
    password: string
  ): Promise<{ token: string; user: Record<string, any> }> {
    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (!userAlreadyExists) {
      throw new Error("Email or password invalid");
    }

    const matchPassword = await compare(password, userAlreadyExists.password);

    if (!matchPassword) {
      throw new Error("Email or password invalid");
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const token = await generateTokenProvider.execute(userAlreadyExists.id);
    const user = classToPlain(userAlreadyExists);

    return { token, user };
  }
}

export { CreateUserAuthenticateUseCase };
