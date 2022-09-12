import { IsAlphanumeric, Min, Max} from "class-validator"

export class CreateUserDTO { //Campi

    @IsAlphanumeric()
    name: string;

    @Min(18)
    @Max(100)
    age: number;
    
    password?: string;
}