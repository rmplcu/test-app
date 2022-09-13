import { ApiProperty } from '@nestjs/swagger';
import { MinDate } from 'class-validator'

export class CreateTodoDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    userId: number;
}
