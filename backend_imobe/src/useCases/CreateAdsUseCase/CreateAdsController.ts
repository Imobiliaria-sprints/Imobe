import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AdsRepository } from "../../repositories/factory/AdsRepository";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { CreateAdsUseCase } from "./CreateAdsUseCase";
import { validate } from "class-validator";

class CreateAdsController {
  /**
   *
   * @param {Request} request
   * @param {Response} response
   * @returns {Response} This method returns the response ads
   */
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, rooms, price, square_meters } = request.body;
    const { user_id } = request;

    const adsRepository = getCustomRepository(AdsRepository);
    const userRepository = getCustomRepository(UserRepository);

    const createAdsUseCase = new CreateAdsUseCase(
      adsRepository,
      userRepository
    );

    try {
      const ads = await createAdsUseCase.execute(
        title,
        price,
        rooms,
        square_meters,
        user_id
      );

      return response.json(ads);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export default new CreateAdsController();
