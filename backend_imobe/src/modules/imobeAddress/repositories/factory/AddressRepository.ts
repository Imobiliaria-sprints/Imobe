import { EntityRepository, Repository } from "typeorm";
import { Address } from "@entity/Address";
import {IAddressDTO, IAddressRepository} from "@modules/imobeAddress/repositories/IAddressRepository";

@EntityRepository(Address)
class AddressRepository extends Repository<Address> implements IAddressRepository {
    async createAddress(data: IAddressDTO): Promise<Address> {
        const address = this.create(data);

        await this.save(address);

        return address;
    }

}

export { AddressRepository };
