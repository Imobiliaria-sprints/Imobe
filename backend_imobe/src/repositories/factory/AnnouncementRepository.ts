import { EntityRepository, Repository } from "typeorm";
import { ICreateAnnouncementDTO } from "@cases/CreateAnnouncementUseCase/ICreateAnnouncementDTO";
import { IAnnouncementRepository } from "../IAnnouncementRepository";
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
  }: ICreateAnnouncementDTO): Promise<Announcement> {
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
}

export { AnnouncementRepository };
