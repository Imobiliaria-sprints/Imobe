import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AdsRepository } from "../../repositories/factory/AdsRepository";
import { CreateAddressUseCase } from "./CreateAddressUseCase";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { street, city, block, complement, state, zip_code, number } =
      request.body;

    const { ads_id } = request.params;

    const adsRepository = getCustomRepository(AdsRepository);
    const createAddressUseCase = new CreateAddressUseCase(adsRepository);

    const address = await createAddressUseCase.execute({
      ads_id,
      city,
      state,
      street,
      number,
      zip_code,
      block,
      complement,
    });
    console.log(address);
    return response.json(address);
  }
}

export default new CreateAddressController();
