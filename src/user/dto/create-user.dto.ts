import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    password: string;
}