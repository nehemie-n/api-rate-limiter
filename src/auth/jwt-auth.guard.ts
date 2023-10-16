import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly clientService: ClientsService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    // Extract the request object from the context
    const request = context.switchToHttp().getRequest();

    // Call the canActivate method of the parent class
    const canActivate = await super.canActivate(context);

    if (canActivate) {
      // If the token is valid, extract the user ID from the request object
      const userId = request.user.id;

      // Fetch the user from the database using the user ID
      const user = await this.clientService.findByid(userId);

      // If the user is not found, throw an unauthorized exception
      if (!user) {
        throw new UnauthorizedException();
      }

      // Attach the user object to the request for further processing
      request.user = user;

      // Allow the request to proceed
      return true;
    }

    // If the token is invalid, deny the request
    throw new UnauthorizedException();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user, _info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
