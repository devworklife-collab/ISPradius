import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAuthSchema1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "permissions",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "key", type: "varchar", isUnique: true },
          { name: "description", type: "text", isNullable: true }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "roles",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "name", type: "varchar", isUnique: true },
          { name: "description", type: "text", isNullable: true }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "gen_random_uuid()" },
          { name: "email", type: "varchar", isUnique: true },
          { name: "password_hash", type: "varchar" },
          { name: "display_name", type: "varchar", isNullable: true },
          { name: "status", type: "varchar", default: "'active'" },
          { name: "created_at", type: "timestamp with time zone", default: "now()" },
          { name: "updated_at", type: "timestamp with time zone", default: "now()" }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "role_permissions",
        columns: [
          { name: "role_id", type: "uuid", isPrimary: true },
          { name: "permission_id", type: "uuid", isPrimary: true }
        ]
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "user_roles",
        columns: [
          { name: "user_id", type: "uuid", isPrimary: true },
          { name: "role_id", type: "uuid", isPrimary: true }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      "role_permissions",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedTableName: "roles",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "role_permissions",
      new TableForeignKey({
        columnNames: ["permission_id"],
        referencedTableName: "permissions",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "user_roles",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    await queryRunner.createForeignKey(
      "user_roles",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedTableName: "roles",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_roles");
    await queryRunner.dropTable("role_permissions");
    await queryRunner.dropTable("users");
    await queryRunner.dropTable("roles");
    await queryRunner.dropTable("permissions");
  }
}
