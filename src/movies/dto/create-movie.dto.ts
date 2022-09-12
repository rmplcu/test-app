import { Min, Max } from "class-validator"

export class MovieDto {
    title: string

    @Min(1)
    length?: number

    @Max(10)
    @Min(1)
    rating?: number

    genre?: string
}