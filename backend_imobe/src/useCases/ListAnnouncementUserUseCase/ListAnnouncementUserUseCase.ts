import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import image from "../../utils/imageView";
import { AnnouncementRepository } from "../../repositories/factory/AnnouncementRepository";

class ListAnnouncementUserUseCase {
  async execute(
    user_id: string,
    page: number,
    per_page: number
  ): Promise<{ announcement: Record<string, any>; total: number }> {
    const announcementRepository = getCustomRepository(AnnouncementRepository);

    const pageStart = (Number(page) - 1) * Number(per_page);

    const [announcements, total] = await announcementRepository.findAndCount({
      where: { user_id },
      order: { created_at: "DESC" },
      relations: ["userId", "images"],
      take: per_page,
      skip: pageStart,
    });

    const announcement = classToPlain(announcements);

    return { announcement, total };
  }
}

export { ListAnnouncementUserUseCase };
