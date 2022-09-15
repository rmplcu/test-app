import { ApiProperty } from "@nestjs/swagger";

export class UserPasswordDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}