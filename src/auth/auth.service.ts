import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from 'src/clients/clients.service';
import { ClientDocument } from 'src/db/client.entity';

@Injectable()
export class AuthService {
  constructor(
    private clientsService: ClientsService,
    private jwtService: JwtService,
  ) {}

  /**
   * Find the user and return them
   * @param email
   * @param pass
   * @returns
   */
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.clientsService.findByEmail(email);
    if (user?.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return user;
    }
    return null;
  }

  /**
   * Login a a user
   * @param user
   * @returns
   */
  async login(client: ClientDocument) {
    console.log(client.id);
    const payload = {
      email: client.email,
      sub: client.id,
      id: client.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
