import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Announcement } from "./Announcement";

@Entity("announcement")
export class AnnouncementImage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.images)
  @JoinColumn({ name: "announcement_id" })
  announcement: Announcement;
}
