import { IAnnouncementRepository } from "@repos/IAnnouncementRepository";
import { classToPlain } from "class-transformer";

class ListAllAnnouncementUseCase {
  constructor(private announcementRepository: IAnnouncementRepository) {}

  async execute(page: number, per_page: number) {
    const { announcements, total } =
      await this.announcementRepository.findAllAnnoucement(page, per_page);

    const announcement = classToPlain(announcements);

    return { announcement, total };
  }
}

export { ListAllAnnouncementUseCase };
