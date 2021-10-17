import {Address} from "@entity/Address";
import {ICreateAddressUseCase} from "./ICreateAddressUseCase";
import {IAddressDTO, IAddressRepository} from "@modules/imobeAddress/repositories/IAddressRepository";

class CreateAddressUseCase implements ICreateAddressUseCase {
  constructor(
      private addressRepository: IAddressRepository
  ) {}

  async execute({
    address,
    number,
    zip_code,
    block,
    complement,
    latitude,
    longitude
  }: IAddressDTO): Promise<Address> {
    const address_data = await this.addressRepository.createAddress({
      address,
      number,
      zip_code,
      block,
      complement,
      latitude,
      longitude
    });

    return address_data;
  }
}

export { CreateAddressUseCase };
