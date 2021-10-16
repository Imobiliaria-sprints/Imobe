import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany, OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

import { Length, IsInt, Min } from "class-validator";
import { AnnouncementImage } from "./AnnouncementImage";
import {Address} from "@entity/Address";

@Entity("announcement")
export class Announcement {
  @PrimaryColumn()
  id: string;

  @Column()
  @Length(10, 90)
  title: string;

  @Column()
  slug_title: string;

  @Column()
  @IsInt()
  @Min(0)
  rooms: number;

  @Column()
  price: string;

  @Column()
  square_meters: number;

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  userId: User;

  @OneToMany(() => AnnouncementImage, (image) => image.announcement, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "announcement_id" })
  images: AnnouncementImage[];

  @Column()
  address_id: string;

  @JoinColumn({name: "address_id"})
  @OneToOne(() => Address)
  Address: Address

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
