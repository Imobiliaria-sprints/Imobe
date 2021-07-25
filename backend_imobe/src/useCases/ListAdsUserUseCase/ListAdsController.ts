import { Request, Response } from "express";
import { ListAdsUserUseCase } from "./ListAdsUserUseCase";

class ListAdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listAdsUserUseCase = new ListAdsUserUseCase();

    const ads = await listAdsUserUseCase.execute(user_id);

    return response.json(ads);
  }
}

export default new ListAdsController();
