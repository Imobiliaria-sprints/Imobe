import { getCustomRepository } from "typeorm";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { RefreshTokenRepository } from "../../repositories/factory/RefreshTokenRepository";
import dayjs from "dayjs";
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken";

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

    const refreshTokenExists = await refreshTokenRepository.findOne(
      refresh_token
    );

    if (!refreshTokenExists) {
      throw new Error("Refresh token invalid");
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshTokenExists.expires_in)
    );

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(
      refreshTokenExists.user_id
    );

    if (refreshTokenExpired) {
      await refreshTokenRepository.delete({
        user_id: refreshTokenExists.user_id,
      });

      const generateRefreshToken = new GenerateRefreshToken();

      const refreshToken = await generateRefreshToken.execute(
        refreshTokenExists.user_id
      );

      return { token, refreshToken };
    }

    return token;
  }
}

export { RefreshTokenUserUseCase };
