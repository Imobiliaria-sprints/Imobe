import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncementImage1630786936503
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: "announcement_image",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "path",
            type: "varchar",
          },
          {
            name: "announcement_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKImageAnnouncement",
            columnNames: ["announcement_id"],
            referencedTableName: "announcement",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("announcement_image");
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
