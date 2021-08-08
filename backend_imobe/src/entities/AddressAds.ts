import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("address_ads")
export class AddressAds {
  @PrimaryColumn()
  id: string;

  @Column()
  ads_id: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  complement?: string;

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
