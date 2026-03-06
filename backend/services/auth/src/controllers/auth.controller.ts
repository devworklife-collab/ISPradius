import { Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export class AuthController {
  constructor(private authService: AuthService, private userService: UserService) {}

  async login(req: Request, res: Response) {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.format() });
    }

    const { email, password } = result.data;
    const user = await this.authService.validateCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const tokens = await this.authService.createTokens(user);
    return res.json(tokens);
  }

  async me(req: Request, res: Response) {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.json(user);
  }
}
