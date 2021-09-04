import { getCustomRepository } from "typeorm";
import { IAddressDTO } from "../../dtos/IAddressDTO";
import { Address } from "../../entities/Address";
import { ICreateAddressUseCase } from "../../interfaces/ICreateAddressUseCase";
import { AddressRepository } from "@repos/factory/AddressRepository";
import { IAnnouncementRepository } from "@repos/IAnnouncementRepository";

class CreateAddressUseCase implements ICreateAddressUseCase {
  constructor(private adsRepository: IAnnouncementRepository) {}

  async execute({
    announcement_id,
    city,
    state,
    street,
    number,
    zip_code,
    block,
    complement,
  }: IAddressDTO): Promise<Address> {
    const ads = await this.adsRepository.findOneAnnouncementById(
      announcement_id
    );

    if (!ads) {
      throw new Error("Cannot found ads");
    }

    const addressRepository = getCustomRepository(AddressRepository);

    const address = addressRepository.create({
      announcement_id,
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
