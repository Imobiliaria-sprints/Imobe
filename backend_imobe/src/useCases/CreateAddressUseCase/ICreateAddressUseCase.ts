import { Address } from "../../entities/Address";

export interface IAddressDTO {
  announcement_id: string;
  street: string;
  city: string;
  number: string;
  block?: string;
  complement?: string;
  state: string;
  zip_code: string;
}

export interface ICreateAddressUseCase {
  execute({
    announcement_id,
    city,
    state,
    street,
    number,
    zip_code,
    block,
    complement,
  }: IAddressDTO): Promise<Address>;
}
