import { Request, Response } from "express";
import {CreateAddressUseCase} from "@modules/imobeAddress/useCases/CreateAddressUseCase/CreateAddressUseCase";
import {getCustomRepository} from "typeorm";
import {AddressRepository} from "@modules/imobeAddress/repositories/factory/AddressRepository";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {

    const addressRepository = getCustomRepository(AddressRepository);
    const createAddressUseCase = new CreateAddressUseCase(addressRepository);

    const { city, state, street, number, zip_code, block, complement, latitude, longitude } = request.body;

    const address = await createAddressUseCase.execute({
        city,
        state,
        street,
        number,
        zip_code,
        block,
        complement,
        latitude,
        longitude
    });

      return response.json(address);
  }
}

export { CreateAddressController };
