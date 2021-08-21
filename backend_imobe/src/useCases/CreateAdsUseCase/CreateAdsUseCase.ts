import { Ads } from "../../entities/Ads";
import { ICreateAdsUseCase } from "../../interfaces/ICreateAdsUseCase";
import { IAdsRepository } from "../../repositories/IAdsRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

class CreateAdsUseCase implements ICreateAdsUseCase {
  constructor(
    private adsRepository: IAdsRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   *
   * @param {string} title
   * @param {number} price
   * @param {number} rooms
   * @param {number} square_meters
   * @param {string} user_id
   * @returns {Promise<Ads>} Return promise
   */
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

    const data = {
      title,
      price,
      rooms,
      square_meters,
      user_id,
    };

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
