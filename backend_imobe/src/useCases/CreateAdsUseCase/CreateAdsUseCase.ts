import { Ads } from "../../entities/Ads";
import { ICreateAdsDTO } from "./ICreateAdsDTO";
import { ICreateAdsUseCase } from "../../interfaces/ICreateAdsUseCase";
import { IAdsRepository } from "../../repositories/IAdsRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

class CreateAdsUseCase implements ICreateAdsUseCase {
  constructor(
    private adsRepository: IAdsRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    title: string,
    price: number,
    rooms: number,
    square_meters: number,
    user_id: string
  ): Promise<Ads> {
    const user = await this.userRepository.findOneUserById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const ads = await this.adsRepository.createAds({
      title,
      price,
      rooms,
      square_meters,
      user_id,
    });

    return ads;
  }
}

export { CreateAdsUseCase };
