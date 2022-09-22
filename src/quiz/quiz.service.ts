import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question } from './dto/question.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz, QuizDocument } from './schema/quiz.schema';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>, private authService: AuthService) {}

  async create(createQuizDto: CreateQuizDto, token: string): Promise<Quiz> {
    const data = await this.authService.decrypt(token);
    if (!data || !data.sub) throw new BadRequestException();
    
    const newQuiz = new this.quizModel({...createQuizDto, userId: data.sub})
    return newQuiz.save();
  }
 
  async findAll(token: string): Promise<Quiz[]> {
    const data = await this.authService.decrypt(token);
    if (!data || !data.sub) throw new BadRequestException();

    const quizzes = await this.quizModel.find({userId: data.sub}).exec();
    if (!quizzes || quizzes.length === 0) throw new NotFoundException();

    return quizzes;
  }

  async remove(id: string) : Promise<Quiz> {
    const quiz = await this.quizModel.findById({_id: id}).exec();
    if (!quiz) throw new NotFoundException();
    return quiz.remove();
  }

  async getRandomQuestion(): Promise<Question> {
    const random = (new Date).getTime();
    const quiz = await this.quizModel.find();
    if (!quiz || quiz.length === 0) throw new NotFoundException()
    
    return quiz[random % quiz.length].question;
  }

  async getAnswer(question : Question): Promise<Quiz> {
    return this.quizModel.findOne({question});
  }
}
