import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}

    @ApiParam({name: 'name', description: 'The name of the user'})
    @ApiUnauthorizedResponse({description: 'User not logged in'})
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({type: User, description: 'User found'})
    @ApiNotFoundResponse({description: 'User not found'})
    @Get(':name')
    async findOneByName(@Param('name') name: string): Promise<User> {
        const user = await this.userService.findOneByName(name);
        if (!user) throw new NotFoundException();

        return user;
    }

    @ApiOkResponse({type: User, isArray: true, description: 'Get all users'})
    @ApiUnauthorizedResponse({description: 'User not logged in'})
    //@UseGuards(JwtAuthGuard)
    @Get()
    async getAll() : Promise<User[]> {
        return this.userService.findAll();
    }
}


