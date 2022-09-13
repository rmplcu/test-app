import { Injectable } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todos } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todos) private readonly todosRepo : Repository<Todos>) {}

  async create(createTodoDto: CreateTodoDto, user: User): Promise<Todos> {
    const res = await this.todosRepo.createQueryBuilder().select('MAX(todos.id)', 'id').from(Todos, 'todos').getRawOne();
    if (!res.id) res.id = 0;
    return this.todosRepo.save(this.todosRepo.create({id: res.id + 1, done:false, date: createTodoDto.date, name: createTodoDto.name, user}));
  }

  findAll(): Promise<Todos[]> {
    return this.todosRepo.find();
  }

  findOneOrFail(id: number) : Promise<Todos> {
    return this.todosRepo.findOneByOrFail({id});
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todos> {
    const todo = await this.findOneOrFail(id);
    if (!updateTodoDto.newDate && !updateTodoDto.newDate) return todo;
    
    if (updateTodoDto.newDate) todo.date = updateTodoDto.newDate;
    if (updateTodoDto.newName) todo.name = updateTodoDto.newName;
    if (updateTodoDto.done !== null) todo.done = updateTodoDto.done;

    return this.todosRepo.save(todo);
  }

  async remove(id: number) : Promise<Todos> {
    const todo = await this.findOneOrFail(id);
    return this.todosRepo.remove(todo);
  }
}
