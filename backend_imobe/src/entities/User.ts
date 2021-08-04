import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Exclude } from "class-transformer";

import { Length, IsEmail } from "class-validator";

@Entity("users")
class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  @Length(10, 70)
  name: string;

  @Column()
  @Length(5, 15)
  phone: string;

  @Column()
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  @Length(8, 40)
  password: string;

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

export { User };
