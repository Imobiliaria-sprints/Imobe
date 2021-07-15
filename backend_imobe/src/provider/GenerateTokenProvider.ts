import { sign } from "jsonwebtoken";

class GenerateTokenProvider {
  async execute(user_id: string): Promise<string> {
    const token = sign({}, process.env.SECRET_KEY, {
      subject: user_id,
      expiresIn: "1d",
    });

    return token;
  }
}

export { GenerateTokenProvider };
