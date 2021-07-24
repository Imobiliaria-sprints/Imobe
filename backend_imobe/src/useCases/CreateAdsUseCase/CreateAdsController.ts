import { Request, Response } from "express";
import { CreateAdsUseCase } from "./CreateAdsUseCase";

class CreateAdsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, rooms, price, square_meters } = request.body;
    const { user_id } = request;

    const createAdsUseCase = new CreateAdsUseCase();

    const ads = await createAdsUseCase.execute({
      title,
      rooms,
      price,
      square_meters,
      user_id,
    });

    return response.status(201).json(ads);
  }
}

export default new CreateAdsController();
