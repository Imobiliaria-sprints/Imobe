import { v4 as uuid } from "uuid";
import { Announcement } from "../../entities/Announcement";
import { IAnnouncementRepository } from "../IAnnouncementRepository";

class AnnouncementRepositoryInMemory implements IAnnouncementRepository {
  private announcement: Announcement[] = [];

  async createAnnouncement(announcement: Announcement): Promise<Announcement> {
    Object.assign(announcement, {
      id: uuid(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.announcement.push(announcement);

    return announcement;
  }

  async findOneAnnouncementById(id: string): Promise<boolean> {
    const announcements = this.announcement.filter((ad) => ad.id === id);

    return !!announcements;
  }
}

export { AnnouncementRepositoryInMemory };
