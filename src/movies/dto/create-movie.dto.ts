import { ApiProperty } from "@nestjs/swagger"
import { Min, Max } from "class-validator"

export class MovieDto {
    @ApiProperty()
    title: string

    @ApiProperty({required: false, minimum: 1})
    @Min(1)
    length?: number

    @ApiProperty({required: false, minimum: 1, maximum: 10})
    @Max(10)
    @Min(1)
    rating?: number

    @ApiProperty({required: false})
    genre?: string
}