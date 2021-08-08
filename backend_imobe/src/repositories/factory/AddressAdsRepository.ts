import { EntityRepository, Repository } from "typeorm";
import { AddressAds } from "../../entities/AddressAds";

@EntityRepository(AddressAds)
class AddressAdsRepository extends Repository<AddressAds> {}

export { AddressAdsRepository };
