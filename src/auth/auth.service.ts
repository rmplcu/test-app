import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { User, UserDocument } from '../user/schema/user.schema';
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Tokens, UserPasswordDto } from './dto/credential.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<UserDocument> {
        const user = await this.userService.findOneByName(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        return null;
    }

    //return new JWT 
    async login(userPassword: UserPasswordDto) : Promise<Tokens> {
        //user exists?
        const user = await this.userService.findOneByName(userPassword.username);
        if (!user) throw new ForbiddenException();

        //compare hashes
        if(!await bcrypt.compare(userPassword.password, user.password)) throw new ForbiddenException();

        //update tokens
        const tokens = await this.getTokens(user._id, user.name);
        await this.updateRTHash(user._id, tokens.refresh_token);

        return tokens;
    }

    async signUp(createUserDto: CreateUserDto): Promise<Tokens> {
        //user exists?
        const user = await this.userService.findOneByName(createUserDto.name);
 
        if (user) {
            throw new BadRequestException();
        }

        const newUser = await this.userService.createUser(createUserDto);

        //generate token for use
        const tokens = await this.getTokens(newUser._id, newUser.name);
        //save hash of refresh token in db 
        await this.updateRTHash(newUser._id, tokens.refresh_token)

        return tokens;
    }

    async refresh(userId: string, rt: string) {
        const user = await this.userService.findById(userId);
        if (!user || !user.refresh_token) throw new ForbiddenException();

        //compare rt with hashed rt
        if (!await bcrypt.compare(rt, user.refresh_token)) throw new ForbiddenException();

        //get tokens
        const tokens = await this.getTokens(user._id, user.name);
        //update tokens
        await this.updateRTHash(userId, tokens.refresh_token);

        return tokens;
    }

    async logout(userId: string) {
        await this.userService.updateUser(userId, {refreshToken: null});
    }

    //generate token for user
    async getTokens(userId: string, username: string): Promise<Tokens> {

        const access_token = await this.jwtService.signAsync({
            sub: userId,
            username
        }, { //config here not in auth module :have 2 differentkeys
            secret: process.env.TOKEN_SECRET,
            expiresIn: 60, //1mins
        })

        const refresh_token = await this.jwtService.signAsync({
            sub: userId,
            username
        }, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: 60 * 60 * 24 * 7 //1 week
        })

        return {
            access_token,
            refresh_token
        }
    }

    async updateRTHash(userID: string, rt: string) {
        const hash = await this.hashData(rt);
        await this.userService.updateUser(userID, {refreshToken: hash});
    }

    hashData(param: string): Promise<string> {
        return bcrypt.hash(param, 10);
    }

    async decrypt(token: string) {
        const decrypted = this.jwtService.decode(token);
        return decrypted;
    }
}
