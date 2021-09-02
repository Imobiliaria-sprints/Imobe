import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import image from "../../utils/imageView";
import { AdsRepository } from "../../repositories/factory/AdsRepository";

class ListAdsUserUseCase {
  async execute(
    user_id: string,
    page = 1,
    per_page = 10
  ): Promise<{ ads: Record<string, any>; total: number }> {
    const adsRepository = getCustomRepository(AdsRepository);

    const pageStart = (Number(page) - 1) * Number(per_page);

    const [ads, total] = await adsRepository.findAndCount({
      where: { user_id },
      order: { created_at: "DESC" },
      relations: ["userId"],
      take: per_page,
      skip: pageStart,
    });

    return { ads, total };
  }
}

export { ListAdsUserUseCase };
