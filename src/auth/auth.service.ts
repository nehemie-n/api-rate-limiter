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
    const user = await this.clientsService.findOne(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  /**
   * Login a a user
   * @param user
   * @returns
   */
  async login(client: ClientDocument) {
    const payload = { email: client.email, id: client.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
