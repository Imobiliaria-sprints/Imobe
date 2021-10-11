import { Request, Response } from "express";
import { UserRepository } from "@modules/imobeUsers/repositories/factory/UserRepository";
import { AnnouncementRepository } from "../../repositories/factory/AnnouncementRepository";
import { DeleteAnnouncementUseCase } from "./DeleteAnnouncementUseCase";
import { getCustomRepository } from "typeorm";

class DeleteAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { announcement_id } = request.params;

    const { user_id } = request;

    const userRepository = getCustomRepository(UserRepository);
    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const deleteAnnouncementUseCase = new DeleteAnnouncementUseCase(
      announcementRepository,
      userRepository
    );

    await deleteAnnouncementUseCase.execute({ announcement_id, user_id });

    return response.status(200).json();
  }
}

export { DeleteAnnouncementController };
