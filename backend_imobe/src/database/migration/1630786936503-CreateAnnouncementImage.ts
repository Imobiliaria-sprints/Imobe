import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncementImage1630786936503
  implements MigrationInterface
{
  protected announcement_image_name = "announcement_image";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.announcement_image_name,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            unsigned: true,
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
    await queryRunner.dropTable(this.announcement_image_name);
  }
}
