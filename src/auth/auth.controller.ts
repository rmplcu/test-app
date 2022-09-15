import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserPasswordDto } from './dto/credential.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @ApiCreatedResponse({description: 'New token created'})
    @ApiUnauthorizedResponse({description: 'Wrong password for user'})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() _ : UserPasswordDto) {
        return this.authService.login(req.user);
    }
}
