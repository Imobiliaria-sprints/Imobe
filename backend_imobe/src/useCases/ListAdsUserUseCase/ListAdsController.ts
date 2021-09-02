import { Request, Response } from "express";
import { ListAdsUserUseCase } from "./ListAdsUserUseCase";
import AdsView from "../../utils/renderAds";

interface QueryRequest {
  page?: number;
  per_page?: number;
}

class ListAdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { page = 1, per_page = 10 }: QueryRequest = request.query;
    const listAdsUserUseCase = new ListAdsUserUseCase();

    const { ads, total } = await listAdsUserUseCase.execute(
      user_id,
      Number(page),
      Number(per_page)
    );

    return response
      .setHeader("x-total-count", String(total))
      .json(AdsView.renderMany(ads));
  }
}

export default new ListAdsController();
