import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { Ads } from "../../entities/Ads";
import { AdsRepository } from "../../repositories/AdsRepository";

class ListAdsUserUseCase {
  async execute(user_id: string): Promise<Record<string, any>> {
    const adsRepository = getCustomRepository(AdsRepository);

    const allAds = await adsRepository.find({
      where: { user_id },
      relations: ["userId"],
    });

    return classToPlain(allAds);
  }
}

export { ListAdsUserUseCase };
