import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Quiz.name, schema: QuizSchema}]), AuthModule, UserModule],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
