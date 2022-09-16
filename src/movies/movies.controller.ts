import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MovieDto } from './dto/create-movie.dto';
import { Movies } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private movieService: MoviesService) {}

    @ApiOkResponse({description: 'Get all movies'})
    @Get()
    findAll(): Promise<Movies[]> {
        console.log(process.env.PORT)
        return this.movieService.findAll();
    }

    @ApiCreatedResponse({description: 'New movie created'})
    @ApiUnauthorizedResponse({description: 'User not logged in'})
    @ApiBody({type: MovieDto})
    @Post('new')
    insertMovie(@Body() body: MovieDto): Promise<Movies> {
        return this.movieService.createMovie(body);
    }
}
