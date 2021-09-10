import { IUserRepository } from "@repos/IUserRepository";
import { classToPlain } from "class-transformer";

class ListAllUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<Record<string, any>> {
    const user = await this.userRepository.findAllUser();

    return classToPlain(user);
  }
}

export { ListAllUserUseCase };
