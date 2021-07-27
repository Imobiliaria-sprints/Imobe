import { Ads } from "../entities/Ads";
import { ICreateAdsDTO } from "../useCases/CreateAdsUseCase/ICreateAdsDTO";

export interface ICreateAdsUseCase {
  execute(
    title: string,
    price: number,
    rooms: number,
    square_meters: number,
    user_id: string
  ): Promise<Ads>;
}
