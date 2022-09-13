import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { Todos } from './entities/todo.entity';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService, private readonly userService: UserService) {}


  @ApiCreatedResponse({description: 'New ToDo Created'})
  @ApiNotFoundResponse({description: 'User not Found'})
  @ApiBadRequestResponse({description: 'Bad POST body'})
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    try {
      const user = await this.userService.findOneById(createTodoDto.userId);
      return this.todosService.create(createTodoDto, user);
    } catch (_) {
      throw new NotFoundException();
    }
  }

  @ApiOkResponse({type: Todos, isArray: true})
  @Get()
  findAll() : Promise<Todos[]> {
    return this.todosService.findAll();
  }

  @ApiOkResponse({type: Todos})
  @ApiNotFoundResponse({description: 'Todo not found'})
  @ApiBadRequestResponse({description: 'Todo id must be zero or positive'})
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) : Promise<Todos> {
    if (id<0) throw new BadRequestException();
    try {
      return await this.todosService.findOneOrFail(+id);
    } catch (_) {
      throw new NotFoundException();
    }
  }

  @ApiOkResponse({type: Todos})
  @ApiNotFoundResponse({description: 'Todo not found'})
  @ApiBadRequestResponse({description: 'Todo id must be zero or positive'})
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<Todos> {
    if (id<0) throw new BadRequestException();
    try {
      return this.todosService.update(+id, updateTodoDto);
    } catch (_) {
      throw new NotFoundException();
    }
  }

  @ApiOkResponse()
  @ApiBadRequestResponse({description: 'Todo id must be zero or positive'})
  @ApiNotFoundResponse({description: 'Todo not found'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Todos> {
    if (id < 0) throw new BadRequestException();
    try {
      return this.todosService.remove(+id);
    } catch (_) {
      throw new NotFoundException();
    }
  }
}
