import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('Token faltante');

    const token = authHeader.replace('Bearer ', '');

    const user = await this.usersService.findByToken(token);

    if (!user) throw new UnauthorizedException('Token inválido');

    request.user = user;
    return true;
  }
}

