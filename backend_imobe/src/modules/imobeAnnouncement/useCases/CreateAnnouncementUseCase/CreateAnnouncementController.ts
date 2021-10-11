import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AnnouncementRepository } from "../../repositories/factory/AnnouncementRepository";
import { UserRepository } from "@modules/imobeUsers/repositories/factory/UserRepository";
import { CreateAnnouncementUseCase } from "./CreateAnnouncementUseCase";
import slug from "slug";

class CreateAnnouncementController {
  /**
   *
   * @param {Request} request
   * @param {Response} response
   * @returns {Response} This method returns the response Announcement
   */
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, rooms, price, square_meters } = request.body;
    const { user_id } = request;

    const announcementRepository = getCustomRepository(AnnouncementRepository);
    const userRepository = getCustomRepository(UserRepository);

    const createAnnouncementUseCase = new CreateAnnouncementUseCase(
      announcementRepository,
      userRepository
    );

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const slugTitle = slug(title);

    try {
      const announcement = await createAnnouncementUseCase.execute(
        title,
        slugTitle,
        price,
        rooms,
        square_meters,
        images,
        user_id
      );

      return response.json(announcement);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { CreateAnnouncementController };
