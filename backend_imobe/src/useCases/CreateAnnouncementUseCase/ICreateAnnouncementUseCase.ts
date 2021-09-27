import { Announcement } from "@entity/Announcement";
import { AnnouncementImage } from "@entity/AnnouncementImage";

export interface ICreateAnnouncementUseCase {
  execute(
    title: string,
    slug_title: string,
    price: number,
    rooms: number,
    square_meters: number,
    images: AnnouncementImage[],
    user_id: string
  ): Promise<Announcement>;
}
