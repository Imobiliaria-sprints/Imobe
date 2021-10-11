import { EntityRepository, Repository } from "typeorm";
import { Address } from "@entity/Address";

@EntityRepository(Address)
class AddressRepository extends Repository<Address> {}

export { AddressRepository };
