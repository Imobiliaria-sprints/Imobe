import { getCustomRepository } from "typeorm";
import { Ads } from "../../entities/Ads";
import { ICreateAdsUseCase } from "../../interfaces/ICreateAdsUseCase";
import { AdsRepository } from "../../repositories/AdsRepository";
import { ICreateAdsDTO } from "../CreateAdsUseCase/ICreateAdsDTO";

class ListAdsUserUseCase implements ICreateAdsUseCase {
  async execute({ user_id }: ICreateAdsDTO): Promise<Ads[]> {
    const adsRepository = getCustomRepository(AdsRepository);

    const allAds = await adsRepository.find({
      where: user_id,
      relations: ["userId"],
    });

    return allAds;
  }
}

export { ListAdsUserUseCase };
