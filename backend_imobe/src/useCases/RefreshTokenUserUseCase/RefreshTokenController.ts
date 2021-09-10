import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

class RefreshTokenController {
  /**
   *
   * @Lucas-Duarte-dev
   *
   * @param request
   * @param response
   * @returns Response
   */
  async handle(request: Request, response: Response): Promise<Response> {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = new RefreshTokenUserUseCase();

    const token = await refreshTokenUseCase.execute(refresh_token);

    return response.json({ token });
  }
}

export { RefreshTokenController };
