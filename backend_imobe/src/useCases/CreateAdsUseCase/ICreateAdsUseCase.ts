import { Ads } from "../../entities/Ads";

export interface ICreateAdsUseCase {
  execute(title: string, rooms: number, price: number): Promise<Ads>;
}
