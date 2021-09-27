import { EntityRepository, Repository } from "typeorm";
import {
  IAnnouncementDTO,
  IAnnouncementRepository,
} from "../IAnnouncementRepository";
import { Announcement } from "@entity/Announcement";

@EntityRepository(Announcement)
class AnnouncementRepository
  extends Repository<Announcement>
  implements IAnnouncementRepository
{
  async createAnnouncement({
    title,
    slug_title,
    price,
    rooms,
    square_meters,
    images,
    user_id,
  }: IAnnouncementDTO): Promise<Announcement> {
    const announcement = this.create({
      title,
      slug_title,
      price,
      rooms,
      square_meters,
      images,
      user_id,
    });

    await this.save(announcement);

    return announcement;
  }

  async findOneAnnouncementById(id: string): Promise<boolean> {
    const announcement = await this.findOne({ id });

    return !!announcement;
  }

  async findAllAnnoucement(
    page: number,
    per_page: number
  ): Promise<{
    announcements: Announcement[];
    total: number;
  }> {
    const pageStart = (Number(page) - 1) * Number(per_page);

    const [announcements, total] = await this.findAndCount({
      relations: ["userId", "images"],
      order: { created_at: "DESC" },
      take: per_page,
      skip: pageStart,
    });

    return { announcements, total };
  }
}

export { AnnouncementRepository };
