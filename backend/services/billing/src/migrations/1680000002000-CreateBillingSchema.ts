import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBillingSchema1680000002000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "plans",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "name", type: "varchar", isUnique: true },
          { name: "type", type: "varchar", default: "'residential'" },
          { name: "monthly_price_cents", type: "bigint" },
          { name: "speed_mbps", type: "int", default: 10 },
          { name: "data_quota_gb", type: "int", isNullable: true },
          { name: "is_trial", type: "boolean", default: false },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "subscriptions",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "customer_id", type: "uuid" },
          { name: "plan_id", type: "uuid" },
          { name: "status", type: "varchar", default: "'active'" },
          { name: "next_billing_date", type: "timestamp with time zone", isNullable: true },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "billing_invoices",
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
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "payments",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "customer_id", type: "uuid" },
          { name: "invoice_id", type: "uuid" },
          { name: "amount_cents", type: "bigint" },
          { name: "currency", type: "varchar", default: "USD" },
          { name: "method", type: "varchar", default: "'manual'" },
          { name: "transaction_reference", type: "varchar", isNullable: true },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      })
    );

    await queryRunner.createForeignKey(
      "subscriptions",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "subscriptions",
      new TableForeignKey({
        columnNames: ["plan_id"],
        referencedTableName: "plans",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "billing_invoices",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "payments",
      new TableForeignKey({
        columnNames: ["customer_id"],
        referencedTableName: "customers",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "payments",
      new TableForeignKey({
        columnNames: ["invoice_id"],
        referencedTableName: "billing_invoices",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("payments");
    await queryRunner.dropTable("billing_invoices");
    await queryRunner.dropTable("subscriptions");
    await queryRunner.dropTable("plans");
  }
}
