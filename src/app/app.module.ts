import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from '../movies/entities/movie.entity';
import { MoviesModule } from '../movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { AppController } from './app.controller';
import { CitiesModule } from '../cities/cities.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, CitiesModule, MoviesModule, UserModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    schema: 'test1',
    entities: [Movies],
    synchronize: true
  }), MongooseModule.forRoot('mongodb://localhost:27017/test')],
  controllers: [AppController],
})
export class AppModule {}
