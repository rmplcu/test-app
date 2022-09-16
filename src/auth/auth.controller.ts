import { Controller, UseGuards, Post, Req, Body } from '@nestjs/common';
import { ApiTags, ApiUnauthorizedResponse, ApiCreatedResponse,  ApiBadRequestResponse, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Tokens, UserPasswordDto } from './dto/credential.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { GetCurrentUserId, GetCurrentUserRefreshToken } from '../commons/decorators/user.decorator';
import { Public } from '../commons/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Public()
    @ApiForbiddenResponse({description: 'User not found'})
    @ApiCreatedResponse({description: 'User logged in'})
    @ApiUnauthorizedResponse({description: 'Wrong password for user'})
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async signIn(@Body() authDto : UserPasswordDto): Promise<Tokens> {
        return this.authService.login(authDto);
    }

    @Public()
    @ApiBadRequestResponse({description: 'Username already exists'})
    @ApiCreatedResponse({description: 'New user created'})
    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
        return this.authService.signUp(createUserDto);
    }

    @Public()
    @UseGuards(RefreshJwtGuard)
    @ApiForbiddenResponse({description: 'Unauthorized'})
    @ApiUnauthorizedResponse({description: 'User not logged in'})
    @ApiCreatedResponse({description: 'Token refreshed'})
    @Post('refresh')
    async refresh(@GetCurrentUserId() userId: string, @GetCurrentUserRefreshToken() token: string) { //@Req() req: Requesy -> logout(req.user['id'])
        return this.authService.refresh(userId, token);
    }

    @ApiUnauthorizedResponse({description: 'User not logged in'})
    @ApiCreatedResponse({description: 'User logged out'})
    @Post('logout')
    async logOut(@GetCurrentUserId() userId: string) { 
        return this.authService.logout(userId);
    }
}
