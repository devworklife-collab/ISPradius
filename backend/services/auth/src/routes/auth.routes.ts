import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { AppDataSource } from "../db";
import { requireAuth } from "../middleware/jwt.middleware";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { EventBus } from "ispradius-event-bus";
import { config } from "../config";

const userRepo = AppDataSource.getRepository(User);
const roleRepo = AppDataSource.getRepository(Role);

const eventBus = new EventBus({ redisUrl: config.REDIS_URL });

const authService = new AuthService(userRepo);
const userService = new UserService(userRepo, roleRepo, eventBus);
const controller = new AuthController(authService, userService);

const router = Router();

router.post("/login", (req, res) => controller.login(req, res));
router.get("/me", requireAuth, (req, res) => controller.me(req, res));

export { router as authRouter };
