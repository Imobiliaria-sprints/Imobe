import { Request, Response } from "express";
import { ListAnnouncementUserUseCase } from "./ListAnnouncementUserUseCase";
import announcementView from "../../../../utils/renderAnnouncement";

interface QueryRequest {
  page?: number;
  per_page?: number;
}

class ListAnnouncementController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const { page = 1, per_page = 10 }: QueryRequest = request.query;
    const listAnnouncementUserUseCase = new ListAnnouncementUserUseCase();

    const { announcement, total } = await listAnnouncementUserUseCase.execute(
      user_id,
      Number(page),
      Number(per_page)
    );

    return response
      .setHeader("X-Total-Count", String(total))
      .json(announcementView.renderMany(announcement));
  }
}

export { ListAnnouncementController };
