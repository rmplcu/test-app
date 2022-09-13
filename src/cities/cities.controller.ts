import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './schema/cities.schemas';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiCreatedResponse({type: City, description: 'Creates and returns the new city'})
  @Post()
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @ApiOkResponse({type: City, isArray: true, description: 'Get all the cities in the database'})
  @ApiNotFoundResponse({description: 'No city found in the database'})
  @Get()
  async findAll(): Promise<City[]> {
    const city = await  this.citiesService.findAll();
    if (!city || city.length === 0) throw new NotFoundException();

    return city;
  }

  @ApiOkResponse({type:City, isArray: true, description: 'Get all the countries available'})
  @Get('countries') 
  findAllCounties() : Promise<string[]> {
    return this.citiesService.getAllCountries()
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({type: City, isArray: true})
  @ApiParam({name: 'country', description: 'The country where to search for cities'})
  @Get('country')
  async findByCountry(@Query('country') country : string): Promise<City[]> {
    const cities = await this.citiesService.findByCountry(country);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }

  @ApiOkResponse({type: City, isArray: true})
  @ApiNotFoundResponse()
  @ApiParam({name: 'continent', description: 'The continent where to search for cities'})
  @Get('continent')
  async findByContinent(@Query('continent') continent: string) : Promise<City[]> {
    const cities = await this.citiesService.findByContinent(continent);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }

  @ApiOkResponse({type: City})
  @ApiNotFoundResponse()
  @ApiParam({name: 'name', description: 'The name of the city to find'})
  @Get(':name')
  async findByName(@Param('name') name: string): Promise<City[]> {
    const city = await this.citiesService.findByName(name);
    if (!city) throw new NotFoundException();

    return city;
  }

  @ApiOkResponse({type: City})
  @ApiNotFoundResponse({description: 'City not found'})
  @ApiParam({name: 'name', description: 'The name of the city to delete'})
  @Delete(':name')
  async remove(@Param('name') name: string): Promise<City> {
    const city = await this.citiesService.remove(name);
    if (!city) throw new NotFoundException();

    return city;
  }

  @ApiOkResponse({type: City, isArray: true, description: 'Get all cities with at most {value} million people'})
  @ApiNotFoundResponse()
  @Get('population/min')
  @ApiParam({name: 'value', description: 'Minimum million people'})
  async getCitiesByMinPopulation(@Query('value') value: number) : Promise<City[]> {
    const cities = await this.citiesService.findByFunction(city => city.population >= value);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }

  @ApiOkResponse({type: City, isArray: true, description: 'Get all cities with at most {value} million people'})
  @ApiNotFoundResponse()
  @ApiParam({name: 'value', description: 'Maximum million people'})
  @Get('population/max')
  async getCitiesByMaxPopulation(@Query('value') value: number): Promise<City[]> {
    const cities = await this.citiesService.findByFunction(city => city.population <= value);
    if (!cities || cities.length === 0) throw new NotFoundException();

    return cities;
  }
  
}
