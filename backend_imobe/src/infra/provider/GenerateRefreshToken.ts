import dayjs from "dayjs";
import { getCustomRepository } from "typeorm";
import { RefreshTokenRepository } from "@modules/imobeAuth/repositories/factory/RefreshTokenRepository";

class GenerateRefreshToken {
  /**
   * @Lucas-Duarte-dev
   *
   * Get user id for the refresh token.
   * @param user_id
   * @returns RefreshToken
   */
  async execute(user_id: string) {
    const refreshToken = getCustomRepository(RefreshTokenRepository);
    const expires_in = dayjs().add(1, "day").unix();

    const generateRefreshToken = refreshToken.create({ user_id, expires_in });

    await refreshToken.save(generateRefreshToken);

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
