import {
  IDeleteAnnouncement,
  IDeleteAnnouncementDTO,
} from "./IDeleteAnnouncement";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";
import { IUserRepository } from "@modules/imobeUsers/repositories/IUserRepository";

class DeleteAnnouncementUseCase implements IDeleteAnnouncement {
  constructor(
    private announcementRepository: IAnnouncementRepository,
    private userRepository: IUserRepository
  ) {}

  async execute({
    announcement_id,
    user_id,
  }: IDeleteAnnouncementDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findOneUserById(
      user_id
    );

    if (!userAlreadyExists) {
      throw new Error("User not found");
    }

    const announcementAlreadyExists =
      await this.announcementRepository.findOneAnnouncementById(
        announcement_id
      );

    if (!announcementAlreadyExists) {
      throw new Error("Announcement not found");
    }

    if (user_id !== announcementAlreadyExists.user_id) {
      throw new Error("Unauthorized");
    }

    await this.announcementRepository.deleteAnnouncement(announcement_id);
  }
}

export { DeleteAnnouncementUseCase };
