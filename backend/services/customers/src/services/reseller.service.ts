import { Repository } from "typeorm";
import { Reseller } from "../entities/Reseller";

export class ResellerService {
  constructor(private resellerRepo: Repository<Reseller>) {}

  async list() {
    return this.resellerRepo.find({ order: { name: "ASC" } });
  }

  async create(data: Partial<Reseller>) {
    const existing = await this.resellerRepo.findOne({ where: { name: data.name } });
    if (existing) {
      throw new Error("Reseller with this name already exists");
    }
    const reseller = this.resellerRepo.create(data);
    return this.resellerRepo.save(reseller);
  }
}
