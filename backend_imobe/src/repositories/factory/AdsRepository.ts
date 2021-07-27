import { EntityRepository, Repository } from "typeorm";
import { ICreateAdsDTO } from "../../useCases/CreateAdsUseCase/ICreateAdsDTO";
import { IAdsRepository } from "../IAdsRepository";
import { Ads } from "../../entities/Ads";

@EntityRepository(Ads)
class AdsRepository extends Repository<Ads> implements IAdsRepository {
  async createAds({
    title,
    price,
    rooms,
    square_meters,
    user_id,
  }: ICreateAdsDTO): Promise<Ads> {
    const ads = this.create({ title, price, rooms, square_meters, user_id });

    await this.save(ads);

    return ads;
  }
}

export { AdsRepository };
