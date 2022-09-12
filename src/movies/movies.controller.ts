import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { MovieDto } from './dto/create-movie.dto';
import { Movies } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private movieService: MoviesService) {}

    @Get()
    findAll(): Promise<Movies[]> {
        return this.movieService.findAll();
    }

    @Post()
    insertMovie(@Body() body: MovieDto): Promise<Movies> {
        return this.movieService.createMovie(body);
    }

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
