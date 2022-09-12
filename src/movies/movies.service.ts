import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/create-movie.dto';
import { Movies } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    constructor(@InjectRepository(Movies) private readonly movieRepo: Repository<Movies>) {}

    findAll() : Promise<Movies[]> {
        return this.movieRepo.find();
    }

    async createMovie(movie: MovieDto): Promise<Movies> {
        const res = await this.movieRepo.createQueryBuilder().select('MAX(movies.id)', 'id').from(Movies, 'movies').getRawOne();
        if (!res.id) res.id = 0;
        const newMovie = this.movieRepo.create({id: res.id + 1, ...movie});

        return this.movieRepo.save(newMovie);
    }

    async updateMovie(movieid: number, moviedto: MovieDto) : Promise<Movies> {
        try {
            const movie = await this.movieRepo.findOneByOrFail({id: movieid});
            movie.title = moviedto.title;
            if (moviedto.genre) movie.genre = moviedto.genre;
            if (moviedto.length) movie.length = moviedto.length;
            if (moviedto.rating) movie.rating = moviedto.rating;

            return this.movieRepo.save(movie);
        } catch (err) {
            throw err;
        }
    }

}
