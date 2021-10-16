import { getCustomRepository } from "typeorm";
import { Address } from "@entity/Address";
import { IAddressDTO, ICreateAddressUseCase } from "./ICreateAddressUseCase";
import { AddressRepository } from "../../repositories/factory/AddressRepository";
import { IAnnouncementRepository } from "@modules/imobeAnnouncement/repositories/IAnnouncementRepository";

class CreateAddressUseCase implements ICreateAddressUseCase {
  constructor(private adsRepository: IAnnouncementRepository) {}

  async execute({
    city,
    state,
    street,
    number,
    zip_code,
    block,
    complement,
    latitude,
    longitude
  }: IAddressDTO): Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);

    const address = addressRepository.create({
      city,
      state,
      street,
      number,
      zip_code,
      block,
      complement,
      latitude,
      longitude
    });

    await addressRepository.save(address);

    return address;
  }
}

export { CreateAddressUseCase };
