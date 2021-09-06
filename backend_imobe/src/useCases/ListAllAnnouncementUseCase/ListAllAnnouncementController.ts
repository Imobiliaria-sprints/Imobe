import { AnnouncementRepository } from "@repos/factory/AnnouncementRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ListAllAnnouncementUseCase } from "./ListAllAnnouncementUseCase";
import renderAnnouncement from "@app/utils/renderAnnouncement";

class ListAllAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const listAllAnouncementUseCase = new ListAllAnnouncementUseCase(
      announcementRepository
    );

    const { announcement, total } = await listAllAnouncementUseCase.execute();

    return response
      .setHeader("x-total-count", String(total))
      .json(renderAnnouncement.renderMany(announcement));
  }
}

export default new ListAllAnnouncementController();
