import {IAddressDTO, IAddressRepository} from "@modules/imobeAddress/repositories/IAddressRepository";
import {Address} from "@entity/Address";
import {v4 as uuid} from 'uuid';

class AddressRepositoryInMemory implements IAddressRepository{
    private addresses: Address[] = [];
    private static instance: AddressRepositoryInMemory;
    constructor() {
        this.addresses = [];
    }

    static getInstance(): AddressRepositoryInMemory {
        if(!AddressRepositoryInMemory.instance) {
            AddressRepositoryInMemory.instance = new AddressRepositoryInMemory();
        }

        return AddressRepositoryInMemory.instance;
    }

    async createAddress(data: IAddressDTO): Promise<Address> {
        const address = Object.assign(data, {
            id: uuid(),
            created_at: new Date,
            updated_at: new Date,
        })

        this.addresses.push(address);

        return address;
    }

}

export {AddressRepositoryInMemory};