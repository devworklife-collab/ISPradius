import "reflect-metadata";
import { AppDataSource } from "../db";
import { Permission } from "../entities/Permission";
import { Role } from "../entities/Role";

const roles = [
  "Super Admin",
  "ISP Administrator",
  "Billing Manager",
  "Support Agent",
  "Network Engineer",
  "Technician",
  "Read Only User"
];

const permissions = [
  { key: "customers.read", description: "Read customer data" },
  { key: "customers.write", description: "Create / update customers" },
  { key: "billing.read", description: "View billing information" },
  { key: "billing.write", description: "Manage billing and invoices" },
  { key: "network.read", description: "View network status" },
  { key: "network.write", description: "Manage network devices" },
  { key: "tickets.read", description: "View support tickets" },
  { key: "tickets.write", description: "Manage support tickets" }
];

async function run() {
  await AppDataSource.initialize();
  console.log("Connected to database");

  const permRepo = AppDataSource.getRepository(Permission);
  const roleRepo = AppDataSource.getRepository(Role);

  for (const p of permissions) {
    await permRepo.save({ key: p.key, description: p.description });
  }

  for (const roleName of roles) {
    let role = await roleRepo.findOne({ where: { name: roleName } });
    if (!role) {
      role = roleRepo.create({ name: roleName, description: roleName });
    }

    // assign a basic set of permissions for Super Admin
    if (roleName === "Super Admin") {
      const allPerms = await permRepo.find();
      role.permissions = allPerms;
    }

    await roleRepo.save(role);
  }

  console.log("Seeded roles and permissions");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
