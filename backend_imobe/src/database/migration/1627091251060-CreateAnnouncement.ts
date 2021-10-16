import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncement1627091251060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "announcement",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "slug_title",
            type: "varchar",
          },
          {
            name: "rooms",
            type: "integer",
            unsigned: true,
          },
          {
            name: "price",
            type: "varchar",
            unsigned: true,
          },
          {
            name: "square_meters",
            type: "float",
            unsigned: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "address_id",
            type: "uuid"
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
        foreignKeys: [
          {
            name: "FKUserAnnouncement",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "FKAddressAnnouncement",
            referencedTableName: "address",
            referencedColumnNames: ["id"],
            columnNames: ["address_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("announcement");
  }
}
