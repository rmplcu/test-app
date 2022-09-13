import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from '../movies/entities/movie.entity';
import { MoviesModule } from '../movies/movies.module';
import { Todos } from '../todos/entities/todo.entity';
import { TodosModule } from '../todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from '../cities/cities.module';

@Module({
  imports: [CitiesModule, TodosModule, MoviesModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    schema: 'test1',
    entities: [User, Movies, Todos],
    synchronize: true
  }), MongooseModule.forRoot('mongodb://localhost:27017/test')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
