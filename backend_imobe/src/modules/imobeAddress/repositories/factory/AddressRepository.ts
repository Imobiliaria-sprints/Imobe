import { EntityRepository, Repository } from "typeorm";
import { Address } from "@entity/Address";
import {IAddressDTO, IAddressRepository} from "@modules/imobeAddress/repositories/IAddressRepository";

@EntityRepository(Address)
class AddressRepository extends Repository<Address> implements IAddressRepository {
    async createAddress({
        city, state, street, number, zip_code, block, complement, latitude, longitude
    }: IAddressDTO): Promise<Address> {
        const address = this.create({
            city, state, street, number, zip_code, block, complement, latitude, longitude
        });

        await this.save(address);

        return address;
    }

    async findOneAddress(address_id: string): Promise<Address> {
        const address = await this.findOne(address_id);

        return address;
    }

}

export { AddressRepository };
