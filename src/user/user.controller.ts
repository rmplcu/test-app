import { BadRequestException, Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { PasswordDto } from './dto/psw.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private userService : UserService) {}
    
    @ApiNotFoundResponse()
    @ApiOkResponse({type: User, isArray: true})
    @Get('all')
    getAll() : Promise<User[]> {
        return this.getAllUsers();
    }

    @ApiNotFoundResponse()
    @ApiOkResponse({type: User, isArray: true})
    @Get()
    async getAllUsers(@Query('name') name?: string) : Promise<User[]> {
        const users = await this.userService.findAll(name);
        if (users.length === 0) throw new NotFoundException();

        return users;
    }
    
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @ApiOkResponse({type: User})
    @Get(':id') 
    async getOneById(@Param('id', ParseIntPipe) id : number) : Promise<User> { //Pipe -> trasforma in Int
        if (id < 0) throw new BadRequestException();
        
        const user = await this.userService.findOneById(id);
        if (!user) throw new NotFoundException();
        
        return user;
    }

    @ApiNotFoundResponse()
    @ApiOkResponse({type: User})
    @Post('password')
    async setPassword(@Body() body: PasswordDto) : Promise<User> {
        const newPsw = await this.userService.setPassword(body);
        if (!newPsw) throw new NotFoundException();

        return newPsw;
    }

    @ApiOkResponse({type: Boolean})
    @Post('validate-password')
    comparePsw(@Body() body : PasswordDto): Promise<boolean>{
        return this.userService.comparePsw(body)
    }

    @ApiCreatedResponse({type: User})
    @Post('new')
    createUser(@Body() body : CreateUserDTO) : Promise<User> {
        return this.userService.createUser(body);
    }
}