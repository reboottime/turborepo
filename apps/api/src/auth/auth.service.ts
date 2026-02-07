import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private readonly adminEmail = process.env.ADMIN_EMAIL ?? "admin@demo.com";
  private readonly adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  constructor(private readonly jwtService: JwtService) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string } | null> {
    if (email === this.adminEmail && password === this.adminPassword) {
      const payload = { sub: "admin", email };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async validateToken(payload: { sub: string; email: string }) {
    if (payload.sub === "admin" && payload.email === this.adminEmail) {
      return { id: "admin", email: payload.email };
    }
    return null;
  }
}
