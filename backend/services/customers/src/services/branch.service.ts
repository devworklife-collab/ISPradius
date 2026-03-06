import { Repository } from "typeorm";
import { Branch } from "../entities/Branch";

export class BranchService {
  constructor(private branchRepo: Repository<Branch>) {}

  async list() {
    return this.branchRepo.find({ order: { name: "ASC" } });
  }

  async create(data: Partial<Branch>) {
    const existing = await this.branchRepo.findOne({ where: { name: data.name } });
    if (existing) {
      throw new Error("Branch with this name already exists");
    }
    const branch = this.branchRepo.create(data);
    return this.branchRepo.save(branch);
  }
}
