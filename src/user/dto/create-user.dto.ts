import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, Min, Max} from "class-validator"

export class CreateUserDTO { //Campi

    @ApiProperty()
    @IsAlphanumeric()
    name: string;

    @ApiProperty({minimum: 18, maximum: 100})
    @Min(18)
    @Max(100)
    age: number;

    @ApiProperty({required: false})
    password?: string;
}