import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Query,
  UseGuards,
  Request,
  ParseIntPipe
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './schema/cities.schemas';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiCreatedResponse({type: City, description: 'Creates and returns the new city'})
  @Post()
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type: City, isArray: true, description: 'Get all the cities in the database'})
  @ApiNotFoundResponse({description: 'No city found in the database'})
  @Get()
  async findAll(): Promise<City[]> {
    const city = await  this.citiesService.findAll();
    if (!city || city.length === 0) throw new NotFoundException();

    return city;
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type:City, isArray: true, description: 'Get all the countries available'})
  @Get('countries') 
  findAllCounties() : Promise<string[]> {
    return this.citiesService.getAllCountries()
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiNotFoundResponse()
  @ApiOkResponse({type: City, isArray: true})
  @ApiQuery({name: 'country', description: 'The country where to search for cities'})
  @Get('country')
  async findByCountry(@Query() query : {country : string}): Promise<City[]> {
    const cities = await this.citiesService.findByCountry(query.country);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type: City, isArray: true})
  @ApiNotFoundResponse()
  @ApiQuery({name: 'continent', description: 'The continent where to search for cities'})
  @Get('continent')
  async findByContinent(@Query() query : {continent: string}) : Promise<City[]> {
    const cities = await this.citiesService.findByContinent(query.continent);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type: City})
  @ApiNotFoundResponse()
  @ApiParam({name: 'name', description: 'The name of the city to find'})
  @Get(':name')
  async findByName(@Param('name') name: string): Promise<City[]> {
    const city = await this.citiesService.findByName(name);
    if (!city) throw new NotFoundException();

    return city;
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type: City})
  @ApiNotFoundResponse({description: 'City not found'})
  @ApiParam({name: 'name', description: 'The name of the city to delete'})
  @Delete(':name')
  async remove(@Param('name') name: string): Promise<City> {
    const city = await this.citiesService.remove(name);
    if (!city) throw new NotFoundException();

    return city;
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type: City, isArray: true, description: 'Get all cities with at most {value} million people'})
  @ApiNotFoundResponse({description: 'Cities not found'})
  @Get('population/min')
  @ApiQuery({name: 'value', description: 'Minimum million people', type: Number})
  async getCitiesByMinPopulation(@Query() query: {value: number}) : Promise<City[]> {
    const cities = await this.citiesService.findByMinPopulation(query.value);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse({description: 'User not logged in'})
  @ApiOkResponse({type: City, isArray: true, description: 'Get all cities with at most {value} million people'})
  @ApiNotFoundResponse({description: 'Cities not found'})
  @ApiQuery({name: 'value', description: 'Maximum million people'})
  @Get('population/max')
  async getCitiesByMaxPopulation(@Query() query : {value: number}): Promise<City[]> {
    const cities = await this.citiesService.findByMaxPopulation(query.value);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }
  
}
