import {Address} from "@entity/Address";

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

export interface IAddressRepository {
    createAddress(data: IAddressDTO): Promise<Address>;
}