import { v4 as uuid } from "uuid";
import { Announcement } from "@entity/Announcement";
import { IAnnouncementRepository } from "../IAnnouncementRepository";
import { DeleteResult } from "typeorm";

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

  async findOneAnnouncementById(id: string): Promise<Announcement> {
    const announcements = this.announcement.find((ad) => ad.id === id);

    return announcements;
  }

  async findAllAnnoucement(): Promise<{
    announcements: Announcement[];
    total: number;
  }> {
    const announcements = this.announcement;
    const total = announcements.length;
    return { announcements, total };
  }

  async searchAnnouncement(title: string): Promise<Announcement[]> {
    const announcement = this.announcement.filter(
      (announce) => announce.title === title
    );

    return announcement;
  }

  async deleteAnnouncement(id: string): Promise<void> {
    this.announcement.find((announce) => id !== announce.id);
  }
}

export { AnnouncementRepositoryInMemory };
