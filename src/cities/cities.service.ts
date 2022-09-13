import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import {InjectModel} from '@nestjs/mongoose'
import { City, CityDocument } from './schema/cities.schemas';
import { Model } from 'mongoose';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const newCity = new this.cityModel(createCityDto);
    return newCity.save();
  }

  async findAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async findByName(name: string): Promise<City[]> {
    return this.cityModel.find({name}).exec();
  }

  async remove(name: string): Promise<City> {
    return this.cityModel.findOneAndRemove({name}).exec();
  }

  findByCountry(country: string): Promise<City[]> {
    return this.cityModel.find({country}).exec();
  }

  findByContinent(continent: string) :Promise<City[]> {
    return this.cityModel.find({continent}).exec();
  }

  async findByFunction(fn: (target: City) => boolean): Promise<City[]> {
    const cities = (await this.cityModel.find().exec()).filter(fn);

    return cities;
  }

  async getAllCountries(): Promise<string[]> {
    const continents = await this.cityModel.distinct('country').exec();
    return continents;
  }
}
