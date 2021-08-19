import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { v4 as uuid } from "uuid";

@Entity("refresh_token")
export class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @JoinColumn({ name: "user_id" })
  @OneToOne(() => User)
  user: User;

  @Column()
  expires_in: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
