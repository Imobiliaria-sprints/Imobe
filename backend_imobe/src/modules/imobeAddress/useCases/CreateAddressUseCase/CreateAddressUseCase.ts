import { getCustomRepository } from "typeorm";
import { Address } from "@entity/Address";
import {  ICreateAddressUseCase } from "./ICreateAddressUseCase";
import { AddressRepository } from "../../repositories/factory/AddressRepository";
import { IAnnouncementRepository } from "@modules/imobeAnnouncement/repositories/IAnnouncementRepository";
import {IAddressDTO, IAddressRepository} from "@modules/imobeAddress/repositories/IAddressRepository";

class CreateAddressUseCase implements ICreateAddressUseCase {
  constructor(
      private addressRepository: IAddressRepository
  ) {}

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

    const address = this.addressRepository.createAddress({
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

    return address;
  }
}

export { CreateAddressUseCase };
