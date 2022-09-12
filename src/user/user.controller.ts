import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PasswordDto } from './dto/psw.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}

    @Get()
    getAllUsers(@Query('name') name?: string) : Promise<User[]> {
        return this.userService.findAll(name);
    }

    @Get(':id') 
    async getOneById(@Param('id', ParseIntPipe) id : number) : Promise<User> { //Pipe -> trasforma in Int
        if (id < 0) throw new BadRequestException();
        
        const user = await this.userService.findOneById(id);
        if (!user) throw new NotFoundException();
        
        return user;
    }

    @Post('password')
    async setPassword(@Body() body: PasswordDto) : Promise<User> {
        const newPsw = await this.userService.setPassword(body);
        if (!newPsw) throw new InternalServerErrorException();

        return newPsw;
    }

    @Post('validate-password')
    comparePsw(@Body() body : PasswordDto): Promise<boolean>{
        return this.userService.comparePsw(body)
    }

    @Post()
    createUser(@Body() body : CreateUserDTO) : Promise<User> {
        return this.userService.createUser(body);
    }
}