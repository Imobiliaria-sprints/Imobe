import { IUserRepository } from "@modules/imobeUsers/repositories/IUserRepository";

class ResetPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, token: string, password: string) {
    const user = await this.userRepository.findOneUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (token !== user.password_reset_token) {
      throw new Error("Token invalid");
    }

    await this.userRepository.updatePassword(user.id, password);
  }
}

export { ResetPasswordUseCase };
