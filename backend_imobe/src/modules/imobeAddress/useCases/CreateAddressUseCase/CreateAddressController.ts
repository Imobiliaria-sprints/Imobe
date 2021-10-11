import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AnnouncementRepository } from "@modules/imobeAnnouncement/repositories/factory/AnnouncementRepository";
import { CreateAddressUseCase } from "./CreateAddressUseCase";

class CreateAddressController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { street, city, block, complement, state, zip_code, number, latitude, longitude } =
      request.body;

    const { announcement_id } = request.params;

    const announcementRepository = getCustomRepository(AnnouncementRepository);
    const createAddressUseCase = new CreateAddressUseCase(
      announcementRepository
    );

    const address = await createAddressUseCase.execute({
      announcement_id,
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
