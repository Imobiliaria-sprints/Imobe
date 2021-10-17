import {Address} from "@entity/Address";

export interface IAddressDTO {
    address: string;
    number: string;
    block?: string;
    complement?: string;
    zip_code: string;
    latitude: number,
    longitude: number
}

export interface IAddressRepository {
    createAddress({
      address, number, zip_code, block, complement, latitude, longitude
    }: IAddressDTO): Promise<Address>;
    findOneAddress(address_id: string): Promise<Address>
}