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
import { Ads } from "./Ads";

@Entity("address")
export class Address {
  @PrimaryColumn()
  id: string;

  @Column()
  ads_id: string;

  @JoinColumn({ name: "ads_id" })
  @OneToOne(() => Ads)
  ads: Ads;

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
