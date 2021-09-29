import { AnnouncementRepository } from "@repos/factory/AnnouncementRepository";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SearchAnnouncementUseCase } from "./SearchAnnouncementUseCase";

class SearchAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { slug_title } = request.params;

    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const searchAnnouncementUseCase = new SearchAnnouncementUseCase(
      announcementRepository
    );

    const searchAnnouncement = await searchAnnouncementUseCase.execute(
      slug_title
    );

    return response.json(searchAnnouncement);
  }
}

export { SearchAnnouncementController };
