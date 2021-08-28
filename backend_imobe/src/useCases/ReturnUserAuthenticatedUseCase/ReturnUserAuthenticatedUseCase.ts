import { classToPlain } from "class-transformer";
import { IUserRepository } from "@repos/IUserRepository";

class ReturnUserAuthenticatedUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * @Lucas-Duarte-dev
   *
   * @constructor Need to add a class that implements IUserRepository interface
   *
   * @param {string} user_id
   * @returns Record<string, any>
   */
  async execute(user_id: string): Promise<Record<string, any>> {
    const user = await this.userRepository.findOneUserById(user_id);

    if (!user) {
      throw new Error(`User not found`);
    }

    return classToPlain(user);
  }
}

export { ReturnUserAuthenticatedUseCase };
