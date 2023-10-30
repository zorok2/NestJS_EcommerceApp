import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  async signPayload(payload: any, expires?: any): Promise<string> {
    // const option: JwtSignOptions = {
    //   expiresIn: expires,
    // };
    return this.jwtService.sign(payload, expires);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
