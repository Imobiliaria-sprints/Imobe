import {Address} from "@entity/Address";
import {ICreateAddressUseCase} from "./ICreateAddressUseCase";
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
    const address = await this.addressRepository.createAddress({
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
