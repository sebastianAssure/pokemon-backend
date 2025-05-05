import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { handlerError } from '../../common/utils/handler-error.utils';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    public async register(authDto: AuthDto) {
        try {
          const { userName } = authDto;
    
          const user = await this.userService.create(authDto);

          const token = this.getJwtToken({userName: userName});

          return {
            user,
            token
          }
          
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
          
          return {
            token: this.getJwtToken({userName: user.userName})
          };

        } catch (error) {
          handlerError(error, this.logger);
        }
    }

    private getJwtToken(payload: JwtPayload) {
      const token =  this.jwtService.sign(payload);
      return token;
    }
}