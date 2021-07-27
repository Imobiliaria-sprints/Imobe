import { EntityRepository, Repository } from "typeorm";
import { Ads } from "../../entities/Ads";

@EntityRepository(Ads)
class AdsRepository extends Repository<Ads> {}

export { AdsRepository };
