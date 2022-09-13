import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City } from './entities/city.entity';
import { CitySchema } from './schema/cities.schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: City.name, schema: CitySchema}])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
