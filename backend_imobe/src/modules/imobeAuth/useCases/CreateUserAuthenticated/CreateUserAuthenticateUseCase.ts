import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { GenerateTokenProvider } from "@provider/GenerateTokenProvider";
import { UserRepository } from "@modules/imobeUsers/repositories/factory/UserRepository";
import { ICreateUserAuthenticateUseCase } from "./ICreateUserAuthenticateUseCase";
import { classToPlain } from "class-transformer";
import { GenerateRefreshToken } from "@provider/GenerateRefreshToken";
import { RefreshToken } from "@entity/RefreshToken";

class CreateUserAuthenticateUseCase implements ICreateUserAuthenticateUseCase {
  async execute(
    email: string,
    password: string
  ): Promise<{
    token: string;
    authuser: Record<string, any>;
    refreshToken: RefreshToken;
  }> {
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

    const generateRefreshToken = new GenerateRefreshToken();

    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    const authuser = classToPlain(userAlreadyExists);

    return { token, authuser, refreshToken };
  }
}

export { CreateUserAuthenticateUseCase };
