import { EntityRepository, Repository } from "typeorm";
import { ICreateAdsDTO } from "@cases/CreateAdsUseCase/ICreateAdsDTO";
import { IAdsRepository } from "../IAdsRepository";
import { Ads } from "@entity/Ads";

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

  async findOneAdsById(id: string): Promise<boolean> {
    const ads = await this.findOne({ id });

    return !!ads;
  }
}

export { AdsRepository };
