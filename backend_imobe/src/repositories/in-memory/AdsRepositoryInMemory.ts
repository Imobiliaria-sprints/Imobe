import { v4 as uuid } from "uuid";
import { Ads } from "../../entities/Ads";
import { IAdsRepository } from "../IAdsRepository";

class AdsRepositoryInMemory implements IAdsRepository {
  private ads: Ads[] = [];

  async createAds(ads: Ads): Promise<Ads> {
    Object.assign(ads, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.ads.push(ads);

    return ads;
  }

  async findOneAdsById(id: string): Promise<boolean> {
    const ad = this.ads.filter((ad) => ad.id === id);

    return !!ad;
  }
}

export { AdsRepositoryInMemory };
