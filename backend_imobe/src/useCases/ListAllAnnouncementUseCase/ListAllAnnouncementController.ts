import { AnnouncementRepository } from "@repos/factory/AnnouncementRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ListAllAnnouncementUseCase } from "./ListAllAnnouncementUseCase";
import renderAnnouncement from "@app/utils/renderAnnouncement";

class ListAllAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page = 1 } = request.params;
    const { per_page = 10 } = request.query;

    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const listAllAnouncementUseCase = new ListAllAnnouncementUseCase(
      announcementRepository
    );

    const { announcement, total } = await listAllAnouncementUseCase.execute(
      Number(page),
      Number(per_page)
    );

    return response
      .setHeader("X-Total-Count", String(total))
      .json(renderAnnouncement.renderMany(announcement));
  }
}

export { ListAllAnnouncementController };
