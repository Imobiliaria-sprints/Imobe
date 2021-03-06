import { Address } from "@entity/Address";
import {IAddressDTO} from "@modules/imobeAddress/repositories/IAddressRepository";

export interface ICreateAddressUseCase {
  execute({
    address,
    number,
    zip_code,
    block,
    complement,
    latitude,
    longitude,
  }: IAddressDTO): Promise<Address>;
}
