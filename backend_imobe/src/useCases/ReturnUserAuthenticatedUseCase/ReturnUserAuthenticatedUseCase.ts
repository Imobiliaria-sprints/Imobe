import { classToPlain } from "class-transformer";
import { IUserRepository } from "../../repositories/IUserRepository";

class ReturnUserAuthenticatedUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user_id: string) {
    const user = await this.userRepository.findOneUserById(user_id);

    if (!user) {
      throw new Error(`User not found`);
    }

    return classToPlain(user);
  }
}

export { ReturnUserAuthenticatedUseCase };
