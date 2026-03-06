import { Router } from "express";
import { AppDataSource } from "../db";
import { Customer } from "../entities/Customer";
import { Branch } from "../entities/Branch";
import { Reseller } from "../entities/Reseller";
import { CustomerService } from "../services/customer.service";
import { BranchService } from "../services/branch.service";
import { ResellerService } from "../services/reseller.service";
import { CustomerController } from "../controllers/customer.controller";
import { BranchController } from "../controllers/branch.controller";
import { ResellerController } from "../controllers/reseller.controller";

const customerRepo = AppDataSource.getRepository(Customer);
const branchRepo = AppDataSource.getRepository(Branch);
const resellerRepo = AppDataSource.getRepository(Reseller);

const customerService = new CustomerService(customerRepo);
const branchService = new BranchService(branchRepo);
const resellerService = new ResellerService(resellerRepo);

const customerController = new CustomerController(customerService);
const branchController = new BranchController(branchService);
const resellerController = new ResellerController(resellerService);

const router = Router();

router.get("/", (req, res) => customerController.list(req, res));
router.post("/", (req, res) => customerController.create(req, res));
router.get("/stats", (req, res) => customerController.stats(req, res));
router.get("/:id", (req, res) => customerController.get(req, res));
router.put("/:id", (req, res) => customerController.update(req, res));

router.get("/branches", (req, res) => branchController.list(req, res));
router.post("/branches", (req, res) => branchController.create(req, res));

router.get("/resellers", (req, res) => resellerController.list(req, res));
router.post("/resellers", (req, res) => resellerController.create(req, res));

export { router as customerRouter };
