import { ApiProperty } from "@nestjs/swagger";

export class CreateCityDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    continent: string;
    
    @ApiProperty()
    population: number;
}
