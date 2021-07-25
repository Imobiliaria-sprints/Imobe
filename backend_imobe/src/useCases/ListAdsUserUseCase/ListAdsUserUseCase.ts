import { getCustomRepository } from "typeorm";
import { Ads } from "../../entities/Ads";
import { AdsRepository } from "../../repositories/AdsRepository";

class ListAdsUserUseCase {
  async execute(user_id: string): Promise<Ads[]> {
    const adsRepository = getCustomRepository(AdsRepository);

    const allAds = await adsRepository.find({
      where: user_id,
      relations: ["userId"],
    });

    return allAds;
  }
}

export { ListAdsUserUseCase };
