import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { MovieDto } from './dto/create-movie.dto';
import { Movies } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
    constructor(private movieService: MoviesService) {}

    @ApiOkResponse()
    @Get()
    findAll(): Promise<Movies[]> {
        return this.movieService.findAll();
    }

    @ApiBody({type: MovieDto})
    @Post('new')
    insertMovie(@Body() body: MovieDto): Promise<Movies> {
        return this.movieService.createMovie(body);
    }
}
