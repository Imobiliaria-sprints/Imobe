import { Address } from "@entity/Address";

export interface IAddressDTO {
  street: string;
  city: string;
  number: string;
  block?: string;
  complement?: string;
  state: string;
  zip_code: string;
  latitude: number,
  longitude: number
}

export interface ICreateAddressUseCase {
  execute({
    city,
    state,
    street,
    number,
    zip_code,
    block,
    complement,
    latitude,
    longitude,
  }: IAddressDTO): Promise<Address>;
}
