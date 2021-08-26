import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1624136766532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "admin",
            type: "boolean",
            default: false,
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "phone",
            type: "varchar",
            length: "20",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "password_reset_token",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
