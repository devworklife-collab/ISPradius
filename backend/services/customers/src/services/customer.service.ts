import { Repository } from "typeorm";
import { Customer, CustomerState } from "../entities/Customer";

export class CustomerService {
  constructor(private customerRepo: Repository<Customer>) {}

  async list(page = 1, perPage = 25) {
    return this.customerRepo.find({
      take: perPage,
      skip: (page - 1) * perPage,
      order: { createdAt: "DESC" }
    });
  }

  async getStats() {
    const totalCustomers = await this.customerRepo.count();
    const activeCustomers = await this.customerRepo.count({ where: { state: CustomerState.ACTIVE } });

    return {
      totalCustomers,
      activeCustomers
    };
  }

  async getById(id: string) {
    return this.customerRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Customer> & { branchId?: string; resellerId?: string }) {
    const existing = await this.customerRepo.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error("Customer with this email already exists");
    }

    const customer = this.customerRepo.create({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      state: data.state ?? CustomerState.ACTIVE,
      branch: data.branchId ? { id: data.branchId } as any : undefined,
      reseller: data.resellerId ? { id: data.resellerId } as any : undefined
    });

    return this.customerRepo.save(customer);
  }

  async update(id: string, data: Partial<Customer>) {
    await this.customerRepo.update({ id }, data);
    return this.getById(id);
  }
}
