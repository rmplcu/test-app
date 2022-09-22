import {ExtractJwt, Strategy} from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import {Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

export type JwtPayload = {
    sub: string,
    username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userService : UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.TOKEN_SECRET
        })
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        return payload;
    }
}