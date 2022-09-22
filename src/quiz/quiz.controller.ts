import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { GetToken, Public } from '../commons/decorators';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, ApiQuery } from '@nestjs/swagger';
import { Question } from './dto/question.dto';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiBadRequestResponse({description: 'Invalid token'})
  @ApiCreatedResponse({description: 'Created new quiz'})
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @Post()
  create(@Body() createQuizDto: CreateQuizDto, @GetToken() token: string) {
    return this.quizService.create(createQuizDto, token);
  }

  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiNotFoundResponse({description: 'No quiz was found for user'})
  @ApiOkResponse({description: 'Get all quiz of user'})
  @ApiBadRequestResponse({description: 'Invalid token'})
  @Get()
  findAll(@GetToken() token: string) {
    return this.quizService.findAll(token);
  }

  @ApiOkResponse({description: 'Quiz deleted'})
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiNotFoundResponse({description: 'Quiz with {id} not found'})
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.quizService.remove(id);
  }

  @Public()
  @ApiOkResponse({description: 'Get random question'})
  @ApiNotFoundResponse({description: 'No question in database'})
  @Get('random')
  async getRandomQuestion(): Promise<Question> {
    return this.quizService.getRandomQuestion();
  }

  @Public()
  @ApiOkResponse({description: 'True if answer is correct, false otherwise'})
  @ApiNotFoundResponse({description: 'Question not found'})
  @ApiQuery({name: 'answer', description: 'User answer to question'})
  @ApiQuery({name: 'question', description: 'Question to answer'})
  @Get('answer')
  async getAsnwer(@Query() query : {question: string, answer : string}): Promise<Boolean> {
    const quiz = await this.quizService.getAnswer(query.question);
    if (!quiz) throw new NotFoundException();

    return quiz.answer === query.answer;
  }
}
