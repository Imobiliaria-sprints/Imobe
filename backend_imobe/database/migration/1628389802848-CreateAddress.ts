import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddressAds1628389802848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "ads_id",
            type: "uuid",
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "block",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
            length: "50",
          },
          {
            name: "zip_code",
            type: "varchar",
            length: "25",
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
            name: "FKAddressAds",
            referencedTableName: "ads",
            referencedColumnNames: ["id"],
            columnNames: ["ads_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address_ads");
  }
}
