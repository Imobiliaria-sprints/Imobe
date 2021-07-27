import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { ICreateUserAuthenticateUseCase } from "../../interfaces/ICreateUserAuthenticateUseCase";

class CreateUserAuthenticateUseCase implements ICreateUserAuthenticateUseCase {
  async execute(email: string, password: string): Promise<string> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error("Email or password invalid");
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      throw new Error("Email or password invalid");
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const token = await generateTokenProvider.execute(user.id);

    return token;
  }
}

export { CreateUserAuthenticateUseCase };
