import { Announcement } from "@entity/Announcement";

export interface ISearchAnnouncement {
  execute(slug_title: string): Promise<Announcement[]>;
}
