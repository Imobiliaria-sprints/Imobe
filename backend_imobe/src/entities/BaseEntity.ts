import { sanitizeAsync } from "class-sanitizer";
import { validateOrReject } from "class-validator";
import { BeforeInsert, BeforeUpdate } from "typeorm";

export class BaseEntity {
  @BeforeInsert()
  async validate() {
    await sanitizeAsync(this);

    return validateOrReject(this);
  }

  @BeforeUpdate()
  async validateUpdate() {
    await sanitizeAsync(this);

    return validateOrReject(this, { skipMissingProperties: true });
  }
}
