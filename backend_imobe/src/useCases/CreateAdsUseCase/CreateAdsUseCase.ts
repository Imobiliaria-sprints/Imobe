import { getCustomRepository } from "typeorm";
import { Ads } from "../../entities/Ads";
import { AdsRepository } from "../../repositories/factory/AdsRepository";
import { UserRepository } from "../../repositories/factory/UserRepository";
import { ICreateAdsDTO } from "./ICreateAdsDTO";
import { ICreateAdsUseCase } from "../../interfaces/ICreateAdsUseCase";

class CreateAdsUseCase implements ICreateAdsUseCase {
  async execute({
    title,
    price,
    rooms,
    square_meters,
    user_id,
  }: ICreateAdsDTO): Promise<Ads> {
    const adsRepository = getCustomRepository(AdsRepository);

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const ads = adsRepository.create({
      title,
      rooms,
      price,
      square_meters,
      user_id,
    });

    await adsRepository.save(ads);

    return ads;
  }
}

export { CreateAdsUseCase };
