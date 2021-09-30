import { AnnouncementRepository } from "@repos/factory/AnnouncementRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SearchAnnouncementUseCase } from "./SearchAnnouncementUseCase";
import renderAnnouncement from "../../utils/renderAnnouncement";

class SearchAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title } = request.body;

    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const searchAnnouncementUseCase = new SearchAnnouncementUseCase(
      announcementRepository
    );

    const searchAnnouncement = await searchAnnouncementUseCase.execute(title);

    return response.json(renderAnnouncement.renderMany(searchAnnouncement));
  }
}

export { SearchAnnouncementController };
