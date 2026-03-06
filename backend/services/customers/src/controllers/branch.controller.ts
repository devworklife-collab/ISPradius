import { Request, Response } from "express";
import { BranchService } from "../services/branch.service";

export class BranchController {
  constructor(private service: BranchService) {}

  async list(req: Request, res: Response) {
    const branches = await this.service.list();
    res.json(branches);
  }

  async create(req: Request, res: Response) {
    const branch = await this.service.create(req.body);
    res.status(201).json(branch);
  }
}
