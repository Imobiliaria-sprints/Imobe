import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AnnouncementRepository } from "@modules/imobeAnnouncement/repositories/factory/AnnouncementRepository";
import { CreateAddressUseCase } from "./CreateAddressUseCase";
import {ICreateAddressUseCase} from "@modules/imobeAddress/useCases/CreateAddressUseCase/ICreateAddressUseCase";

class CreateAddressController {

  constructor(
      private createAddressUseCase: ICreateAddressUseCase
  ) {
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { street, city, block, complement, state, zip_code, number, latitude, longitude } =
      request.body;
    
    const address = await this.createAddressUseCase.execute({
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
