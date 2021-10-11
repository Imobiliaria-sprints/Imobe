import { Announcement } from "@entity/Announcement";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";
import { classToPlain } from "class-transformer";
import { ISearchAnnouncement } from "./ISearchAnnouncementUseCase";

class SearchAnnouncementUseCase implements ISearchAnnouncement {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(title: string): Promise<Record<string, null>> {
    const announcement = await this.announcementRepository.searchAnnouncement(
      title
    );

    return classToPlain(announcement);
  }
}

export { SearchAnnouncementUseCase };
