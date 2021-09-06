import { IAnnouncementRepository } from "@repos/IAnnouncementRepository";
import { classToPlain } from "class-transformer";

class ListAllAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute() {
    const allAnnouncement = this.announcementRepository.findAllAnnoucement();

    return classToPlain(allAnnouncement);
  }
}

export { ListAllAnnouncementUseCase };
