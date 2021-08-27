import { getCustomRepository } from "typeorm";
import { IAddressDTO } from "../../dtos/IAddressDTO";
import { Address } from "../../entities/Address";
import { ICreateAddressUseCase } from "../../interfaces/ICreateAddressUseCase";
import { AddressRepository } from "@repos/factory/AddressRepository";
import { IAdsRepository } from "@repos/IAdsRepository";

class CreateAddressUseCase implements ICreateAddressUseCase {
  constructor(private adsRepository: IAdsRepository) {}

  async execute({
    ads_id,
    city,
    state,
    street,
    number,
    zip_code,
    block,
    complement,
  }: IAddressDTO): Promise<Address> {
    const ads = await this.adsRepository.findOneAdsById(ads_id);

    if (!ads) {
      throw new Error("Cannot found ads");
    }

    const addressRepository = getCustomRepository(AddressRepository);

    const address = addressRepository.create({
      ads_id,
      city,
      state,
      street,
      number,
      zip_code,
      block,
      complement,
    });

    await addressRepository.save(address);

    return address;
  }
}

export { CreateAddressUseCase };
