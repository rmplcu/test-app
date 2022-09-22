import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDto {
    @ApiProperty()
    question: string;

    @ApiProperty()
    answer: string;
}
