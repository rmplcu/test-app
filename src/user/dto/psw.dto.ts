import { ApiProperty } from "@nestjs/swagger";

export class PasswordDto {
    @ApiProperty()
    user: number;

    @ApiProperty()
    password: string;
}