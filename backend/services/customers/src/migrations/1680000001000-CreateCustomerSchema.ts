import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCustomerSchema1680000001000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "branches",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "name", type: "varchar", isUnique: true },
          { name: "location", type: "varchar", isNullable: true },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "resellers",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "name", type: "varchar", isUnique: true },
          { name: "contact_email", type: "varchar", isNullable: true },
          { name: "phone", type: "varchar", isNullable: true },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "customers",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "full_name", type: "varchar" },
          { name: "email", type: "varchar", isUnique: true },
          { name: "phone", type: "varchar", isNullable: true },
          { name: "address", type: "text", isNullable: true },
          { name: "branch_id", type: "uuid", isNullable: true },
          { name: "reseller_id", type: "uuid", isNullable: true },
          { name: "state", type: "varchar", default: "'active'" },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "invoices",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "invoice_number", type: "varchar", isUnique: true },
          { name: "customer_id", type: "uuid" },
          { name: "amount_cents", type: "bigint" },
          { name: "currency", type: "varchar", default: "USD" },
          { name: "status", type: "varchar", default: "'draft'" },
          { name: "due_date", type: "timestamp with time zone", isNullable: true },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      "customers",
      new TableForeignKey({
        columnNames: ["branch_id"],
        referencedTableName: "branches",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL"
      })
    );

    await queryRunner.createForeignKey(
      "customers",
      new TableForeignKey({
        columnNames: ["reseller_id"],
        referencedTableName: "resellers",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL"
      })
    );

    await queryRunner.createForeignKey(
      "invoices",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("invoices");
    await queryRunner.dropTable("customers");
    await queryRunner.dropTable("resellers");
    await queryRunner.dropTable("branches");
  }
}
