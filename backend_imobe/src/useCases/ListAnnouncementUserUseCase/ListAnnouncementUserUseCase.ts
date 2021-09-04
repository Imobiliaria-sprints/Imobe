import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import image from "../../utils/imageView";
import { AnnouncementRepository } from "../../repositories/factory/AnnouncementRepository";

class ListAnnouncementUserUseCase {
  async execute(
    user_id: string,
    page = 1,
    per_page = 10
  ): Promise<{ announcement: Record<string, any>; total: number }> {
    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const pageStart = (Number(page) - 1) * Number(per_page);

    const [announcement, total] = await announcementRepository.findAndCount({
      where: { user_id },
      order: { created_at: "DESC" },
      relations: ["userId"],
      take: per_page,
      skip: pageStart,
    });

    return { announcement, total };
  }
}

export { ListAnnouncementUserUseCase };
