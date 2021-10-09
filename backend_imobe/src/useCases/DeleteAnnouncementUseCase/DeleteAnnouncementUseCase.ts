import {IDeleteAnnouncement, IDeleteAnnouncementDTO} from "@cases/DeleteAnnouncementUseCase/IDeleteAnnouncement";
import {IAnnouncementRepository} from "@repos/IAnnouncementRepository";
import {IUserRepository} from "@repos/IUserRepository";

class DeleteAnnouncementUseCase implements IDeleteAnnouncement{

    constructor(
        private announcementRepository: IAnnouncementRepository,
        private userRepository: IUserRepository
    ) {};

    async execute({announcement_id, user_id}: IDeleteAnnouncementDTO): Promise<void> {
        const userAlreadyExists = await this.userRepository.findOneUserById(user_id);

        const announcementAlreadyExists = await this.announcementRepository.findOneAnnouncementById(announcement_id);

        if (!userAlreadyExists) {
            throw  new Error("User not found");
        }

        if (!announcementAlreadyExists) {
            throw new Error("Announcement not found");
        }

        if (announcementAlreadyExists.user_id !== user_id) {
            throw new Error("Unauthorized");
        }

        await this.announcementRepository.deleteAnnouncement(announcement_id);
    }

}

export {DeleteAnnouncementUseCase};