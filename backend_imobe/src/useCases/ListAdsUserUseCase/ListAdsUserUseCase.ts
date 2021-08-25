import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import image from "../../utils/imageView";
import { AdsRepository } from "../../repositories/factory/AdsRepository";

class ListAdsUserUseCase {
  async execute(
    user_id: string,
    limit?: number,
    skip = 0
  ): Promise<Record<string, any>> {
    const adsRepository = getCustomRepository(AdsRepository);

    const allAds = await adsRepository.find({
      where: { user_id },
      order: { created_at: "DESC" },
      relations: ["userId"],
      skip: skip,
      take: limit,
    });

    return classToPlain(allAds);
  }
}

export { ListAdsUserUseCase };
