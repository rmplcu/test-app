import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Todos])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService]
})
export class TodosModule {}
