import { AnnouncementImage } from "@entity/AnnouncementImage";

export interface ICreateAnnouncementDTO {
  title: string;
  slug_title: string;
  rooms: number;
  price: number;
  square_meters: number;
  images: AnnouncementImage[] | { path: string }[];
  user_id: string;
}
