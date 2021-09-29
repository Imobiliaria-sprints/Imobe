import { Announcement } from "@entity/Announcement";
import { IAnnouncementRepository } from "@repos/IAnnouncementRepository";
import { ISearchAnnouncement } from "./ISearchAnnouncementUseCase";

class SearchAnnouncementUseCase implements ISearchAnnouncement {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(slug_title: string): Promise<Announcement[]> {
    const announcement = await this.announcementRepository.searchAnnouncement(
      slug_title
    );

    return announcement;
  }
}

export { SearchAnnouncementUseCase };
