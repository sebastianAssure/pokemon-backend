import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/users/entities/user.entity";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/services/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        private readonly userService: UsersService,

        configService: ConfigService
    ) {
        super({

            secretOrKey: configService.get('JWT_SECRET') as string,
  
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  
          });
    }

    async validate(payload: JwtPayload): Promise<UserEntity> {
        const { userName } = payload;

        const user = await this.userService.findByUserName( userName );

        if (!user) throw new UnauthorizedException('Token not valid');

        return user;
    }
}