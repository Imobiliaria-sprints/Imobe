import { Ads } from "../entities/Ads";
import { ICreateAdsDTO } from "../useCases/CreateAdsUseCase/ICreateAdsDTO";

export interface ICreateAdsUseCase {
  execute({
    title,
    price,
    rooms,
    square_meters,
    user_id,
  }: ICreateAdsDTO): Promise<Ads>;
}
