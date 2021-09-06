import { IAnnouncementRepository } from "@repos/IAnnouncementRepository";
import { classToPlain } from "class-transformer";

class ListAllAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute() {
    const { announcements, total } =
      await this.announcementRepository.findAllAnnoucement();

    const announcement = classToPlain(announcements);

    return { announcement, total };
  }
}

export { ListAllAnnouncementUseCase };
