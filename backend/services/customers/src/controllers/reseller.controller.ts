import { Request, Response } from "express";
import { ResellerService } from "../services/reseller.service";

export class ResellerController {
  constructor(private service: ResellerService) {}

  async list(req: Request, res: Response) {
    const resellers = await this.service.list();
    res.json(resellers);
  }

  async create(req: Request, res: Response) {
    const reseller = await this.service.create(req.body);
    res.status(201).json(reseller);
  }
}
