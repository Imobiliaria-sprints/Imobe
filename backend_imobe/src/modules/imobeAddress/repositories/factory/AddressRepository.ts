import { EntityRepository, Repository } from "typeorm";
import { Address } from "@entity/Address";
import {IAddressDTO, IAddressRepository} from "@modules/imobeAddress/repositories/IAddressRepository";

@EntityRepository(Address)
class AddressRepository extends Repository<Address> implements IAddressRepository {
    async createAddress({
        address, number, zip_code, block, complement, latitude, longitude
    }: IAddressDTO): Promise<Address> {
        const address_data = this.create({
            address, number, zip_code, block, complement, latitude, longitude
        });

        await this.save(address_data);

        return address_data;
    }

    async findOneAddress(address_id: string): Promise<Address> {
        const address = await this.findOne(address_id);

        return address;
    }

}

export { AddressRepository };
