import { Ads } from "../entities/Ads";
import { ICreateAdsDTO } from "../useCases/CreateAdsUseCase/ICreateAdsDTO";

export interface IAdsRepository {
  createAds({
    title,
    price,
    rooms,
    square_meters,
    user_id,
  }: ICreateAdsDTO): Promise<Ads>;

  findOneAdsById(id: string): Promise<boolean>;
}
