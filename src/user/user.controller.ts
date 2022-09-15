import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService) {}
    /*
    @ApiCreatedResponse({type: User, description: 'New user created'})
    @Post()
    create(@Body() createUserDto: CreateUserDto) : Promise<User> {
        return this.userService.createUser(createUserDto);
    }*/

    @ApiOkResponse({type: User, description: 'User found'})
    @ApiNotFoundResponse({description: 'User not faound'})
    @Get(':name')
    async findOneByName(@Param('name') name: string): Promise<User> {
        const user = await this.userService.findOneByName(name);
        if (!user) throw new NotFoundException();

        return user;
    }

    @Get()
    async getAll() : Promise<User[]> {
        return this.userService.findAll();
    }
}
