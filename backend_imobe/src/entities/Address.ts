import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Announcement } from "./Announcement";

@Entity("address")
export class Address {
  @PrimaryColumn()
  id: string;

  @Column()
  announcement_id: string;

  @JoinColumn({ name: "announcement_id" })
  @OneToOne(() => Announcement)
  announcement: Announcement;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  complement?: string;

  @Column()
  number: string;

  @Column()
  block?: string;

  @Column()
  state: string;

  @Column()
  zip_code: string;

  @Column()
  latitude: number

  @Column()
  longitude: number

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
