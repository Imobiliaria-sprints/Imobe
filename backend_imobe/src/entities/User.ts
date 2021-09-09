import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { Trim } from "class-sanitizer";
import { BaseEntity } from "./BaseEntity";

@Entity("users")
class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  avatar?: string;

  @Column()
  phone: string;

  @Column()
  admin?: boolean;

  @Trim()
  @Column()
  @IsEmail()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  password_reset_token?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
