import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from '../user/schema/user.schema';
import { UserPasswordDto } from './dto/credential.dto';
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as crypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findOneByName(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        return null;
    }

    //return new JWT 
    async login(user: User) {
        const payload = {name: user.name}; //info= username
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async signUp(createUserDto: CreateUserDto) {
        //user exists?
        const user = await this.userService.findOneByName(createUserDto.name);
 
        if (user) {
            throw new BadRequestException();
        }

        const newUser = await this.userService.createUser(createUserDto);
        return this.login(newUser);
    }
}
