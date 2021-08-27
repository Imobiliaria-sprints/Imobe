import path from "path";
import { ISendMailProvider } from "../../interfaces/ISendMailProvider";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { IUserRepository } from "@repos/IUserRepository";

class ForgotPasswordUseCase {
  /**
   *
   * @param sendMailProvide
   * @param userRepository
   */
  constructor(
    private sendMailProvide: ISendMailProvider,
    private userRepository: IUserRepository
  ) {}

  async execute(email: string) {
    const user = await this.userRepository.findOneUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const token = await generateTokenProvider.execute(user.id);

    await this.userRepository.updatedPasswordToken(user.id, token);

    const forgotPasswordMail = path.resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPasswordMail.hbs"
    );

    await this.sendMailProvide.execute({
      to: email,
      subject: "Esqueceu sua senha",
      variables: {
        token,
      },
      path: forgotPasswordMail,
    });
  }
}

export { ForgotPasswordUseCase };
