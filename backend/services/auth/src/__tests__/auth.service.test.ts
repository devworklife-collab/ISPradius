import { AuthService } from "../services/auth.service";
import { User } from "../entities/User";

describe("AuthService", () => {
  it("generates JWT tokens", async () => {
    const service = new AuthService(null as any);
    const user = { id: "id", email: "test@example.com", roles: [] } as unknown as User;
    const tokens = await service.createTokens(user);

    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
  });
});
