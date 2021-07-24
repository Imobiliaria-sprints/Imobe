import { getCustomRepository } from "typeorm";
import { Ads } from "../../entities/Ads";
import { AdsRepository } from "../../repositories/AdsRepository";
import { ICreateAdsUseCase } from "./ICreateAdsUseCase";

class CreateAdsUseCase implements ICreateAdsUseCase {
  async execute(title: string, rooms: number, price: number): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);

    const ads = adsRepository.create({ title, rooms, price });

    await adsRepository.save(ads);

    return ads;
  }
}

export { CreateAdsUseCase };
