import { IAddressAdsDTO } from "../dtos/IAddressAdsDTO";
import { AddressAds } from "../entities/AddressAds";

export interface ICreateAddressAdsUseCase {
  execute({
    ads_id,
    city,
    state,
    street,
    zip_code,
    block,
    complement,
  }: IAddressAdsDTO): Promise<AddressAds>;
}
