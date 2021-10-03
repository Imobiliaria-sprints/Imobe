import { Announcement } from "@entity/Announcement";
import { AnnouncementImage } from "@entity/AnnouncementImage";

export interface IAnnouncementDTO {
  title: string;
  slug_title: string;
  rooms: number;
  price: string;
  square_meters: number;
  images: AnnouncementImage[] | { path: string }[];
  user_id: string;
}

export interface IAnnouncementRepository {
  createAnnouncement({
    title,
    slug_title,
    price,
    rooms,
    square_meters,
    images,
    user_id,
  }: IAnnouncementDTO): Promise<Announcement>;

  findOneAnnouncementById(id: string): Promise<boolean>;

  findAllAnnoucement(
    page: number,
    per_page: number
  ): Promise<{
    announcements: Announcement[];
    total: number;
  }>;

  searchAnnouncement(title: string): Promise<Announcement[]>;
}
