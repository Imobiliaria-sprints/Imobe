import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./User";

import { Length, IsInt, Min } from "class-validator";

@Entity("ads")
export class Ads {
  @PrimaryColumn()
  id: string;

  @Column()
  @Length(10, 90)
  title: string;

  @Column()
  @IsInt()
  @Min(0)
  rooms: number;

  @Column()
  @Min(1000)
  price: number;

  @Column()
  square_meters: number;

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  userId: User;

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
