import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { handlerError } from '../../common/utils/handler-error.utils';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        private readonly userService: UsersService
    ){}

    public async register(authDto: AuthDto) {
        try {
          const { userName, password } = authDto;
    
          const user = await this.userService.create(authDto);

          const token = await this.login(userName, password);

          return { user, token }

        } catch (error) {
          handlerError(error, this.logger);
        }
    }

    public async login(userName: string, password: string) {
        try {
          const user = await this.userService.findByUserName(userName);
      
          if (!user) {
            throw new UnauthorizedException('Username incorrecto');
          }
      
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new UnauthorizedException('Password incorrecto');
          }
    
          const token = randomBytes(32).toString('hex');
      
          user.token = token;
          await this.userService.update(user.id, user);
      
          return { token };
        } catch (error) {
          handlerError(error, this.logger);
        }
    }
}
