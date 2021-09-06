import { Announcement } from "../entities/Announcement";
import { ICreateAnnouncementDTO } from "@cases/CreateAnnouncementUseCase/ICreateAnnouncementDTO";

export interface IAnnouncementRepository {
  createAnnouncement({
    title,
    slug_title,
    price,
    rooms,
    square_meters,
    images,
    user_id,
  }: ICreateAnnouncementDTO): Promise<Announcement>;

  findOneAnnouncementById(id: string): Promise<boolean>;

  findAllAnnoucement(): Promise<Announcement[]>;
}
