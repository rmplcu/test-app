import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse, ApiCreatedResponse, ApiBearerAuth, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UserPasswordDto } from './dto/credential.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @ApiBearerAuth()
    @ApiCreatedResponse({description: 'New token created'})
    @ApiUnauthorizedResponse({description: 'Wrong password for user'})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() _ : UserPasswordDto) {
        return this.authService.login(req.user);
    }

    @ApiBadRequestResponse({description: 'Username already exists'})
    @ApiCreatedResponse({description: 'New user created'})
    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }
}
