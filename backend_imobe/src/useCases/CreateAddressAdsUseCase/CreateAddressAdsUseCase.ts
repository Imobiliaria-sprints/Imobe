import { getCustomRepository } from "typeorm";
import { IAddressAdsDTO } from "../../dtos/IAddressAdsDTO";
import { AddressAds } from "../../entities/AddressAds";
import { ICreateAddressAdsUseCase } from "../../interfaces/ICreateAddressAdsUseCase";
import { AddressAdsRepository } from "../../repositories/factory/AddressAdsRepository";
import { IAdsRepository } from "../../repositories/IAdsRepository";

class CreateAddressAdsUseCase implements ICreateAddressAdsUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute({
    ads_id,
    city,
    state,
    street,
    zip_code,
    block,
    complement,
  }: IAddressAdsDTO): Promise<AddressAds> {
    const ads = await this.adsRepository.findOneAdsById(ads_id);

    if (!ads) {
      throw new Error("Cannot found ads");
    }

    const addressAdsRepository = getCustomRepository(AddressAdsRepository);

    const addressAds = addressAdsRepository.create({
      ads_id,
      city,
      state,
      street,
      zip_code,
      block,
      complement,
    });

    await addressAdsRepository.save(addressAds);

    return addressAds;
  }
}
