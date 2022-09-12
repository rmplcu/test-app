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

    @ApiParam({name: 'id'})
    @ApiParam({name: 'title'})
    @ApiParam({name: 'length', required: false})
    @ApiParam({name: 'rating', required: false})
    @ApiParam({name: 'genre', required: false})
    @ApiOkResponse()
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Get('update')
    updateMovie(@Query('id') id : number, @Query('title') title: string, @Query('length') length?: number, @Query('rating') rating?: number, @Query('genre') genre?: string) : Promise<Movies> {
        let newMovie = new MovieDto();
        newMovie.title = title;
        if (!title) throw new BadRequestException()
        if (length) newMovie.length = length;
        if (rating) newMovie.rating = rating;
        if (genre) newMovie.genre = genre;
        
        try {
            return this.movieService.updateMovie(id, newMovie);
        } catch (_) {
            throw new NotFoundException();
        } 
    }
}
