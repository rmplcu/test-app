import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiProperty()
    newName?: string;

    @ApiProperty()
    newDate?: Date;

    @ApiProperty()
    done?: boolean;
}
