import { Repository } from "typeorm";
import { EventBus, EventType } from "ispradius-event-bus";
import { User, UserStatus } from "../entities/User";
import { Role } from "../entities/Role";

export class UserService {
  constructor(
    private userRepository: Repository<User>,
    private roleRepository: Repository<Role>,
    private eventBus: EventBus
  ) {}

  async findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async setStatus(userId: string, status: UserStatus) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) return null;

    user.status = status;
    const updated = await this.userRepository.save(user);

    if (status === UserStatus.SUSPENDED) {
      this.eventBus.publish({
        type: EventType.UserSuspended,
        timestamp: new Date().toISOString(),
        payload: { userId: updated.id }
      });
    }

    return updated;
  }

  async createAdmin(email: string, passwordHash: string, displayName?: string) {
    const role = await this.roleRepository.findOne({ where: { name: "Super Admin" } });
    const user = this.userRepository.create({
      email,
      passwordHash,
      displayName,
      status: UserStatus.ACTIVE,
      roles: role ? [role] : []
    });

    return this.userRepository.save(user);
  }
}
