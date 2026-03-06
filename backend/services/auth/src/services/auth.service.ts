import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { config } from "../config";
import { User, UserStatus } from "../entities/User";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor(private userRepository: Repository<User>) {}

  async validateCredentials(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.status !== UserStatus.ACTIVE) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch ? user : null;
  }

  async createTokens(user: User): Promise<Tokens> {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map((role) => role.name)
    };

    const accessToken = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRY
    });

    const refreshToken = jwt.sign({ sub: user.id }, config.JWT_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRY
    });

    return { accessToken, refreshToken };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
}
