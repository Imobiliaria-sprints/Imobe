import { Request, Response } from "express";
import { ListAdsUserUseCase } from "./ListAdsUserUseCase";
import AdsView from "../../utils/renderAds";

interface QueryRequest {
  limit?: number;
  skip?: number;
}

class ListAdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { limit, skip }: QueryRequest = request.query;
    const listAdsUserUseCase = new ListAdsUserUseCase();

    const ads = await listAdsUserUseCase.execute(
      user_id,
      Number(limit),
      Number(skip)
    );

    return response.json(AdsView.renderMany(ads));
  }
}

export default new ListAdsController();
