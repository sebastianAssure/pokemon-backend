import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('/login')
    login(@Body() authDto: AuthDto) {
        const { userName, password } = authDto;
        return this.authService.login(userName, password);
    }

    @Post('/register')
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto);
    }
}
