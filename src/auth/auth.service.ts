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
        const tokens = await this.getTokens(newUser._id, newUser.name);
        await this.updateRefreshToken(newUser._id, tokens.refreshToken);
        
        return tokens;
    }

    async getTokens(userId: string, username: string) {
        const accessToken = await this.jwtService.signAsync({
            sub: userId,
            username
        });

        const refreshToken = await this.jwtService.signAsync({
            sub: userId,
            username
        });

        return {accessToken, refreshToken};
    }

    hashData(data: string): Promise<string> {
        return crypt.hash(data, 10);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashRefreshToken = await this.hashData(refreshToken);
        await this.userService.updateUser(userId, {refreshToken: hashRefreshToken});
    }
}
