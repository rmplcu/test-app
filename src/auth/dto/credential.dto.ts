import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserPasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}

export type Tokens = {
    access_token: string,
    refresh_token: string
}