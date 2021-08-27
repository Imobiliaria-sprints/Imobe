import { EntityRepository, Repository } from "typeorm";
import { RefreshToken } from "@entity/RefreshToken";

@EntityRepository(RefreshToken)
class RefreshTokenRepository extends Repository<RefreshToken> {}

export { RefreshTokenRepository };
