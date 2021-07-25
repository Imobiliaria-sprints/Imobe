import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { ICreateUserUseCase } from "../../interfaces/ICreateUserUseCase";
import { UserRepository } from "../../repositories/UserRepository";

class ListUserUseCase implements ICreateUserUseCase {
  async execute(id: string): Promise<Record<string, any>> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    return classToPlain(user);
  }
}

export { ListUserUseCase };
