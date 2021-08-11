import { IAddressDTO } from "../dtos/IAddressDTO";
import { Address } from "../entities/Address";

export interface ICreateAddressUseCase {
  execute({
    ads_id,
    city,
    state,
    street,
    number,
    zip_code,
    block,
    complement,
  }: IAddressDTO): Promise<Address>;
}
