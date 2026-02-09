import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  private readonly adminEmail: string;
  private readonly adminPassword: string;

  constructor(private readonly jwtService: JwtService) {
    const email = process.env.E2E_TEST_EMAIL;
    const password = process.env.E2E_TEST_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "E2E_TEST_EMAIL and E2E_TEST_PASSWORD environment variables are required",
      );
    }

    this.adminEmail = email;
    this.adminPassword = password;
  }

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
