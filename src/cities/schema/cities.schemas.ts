import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema()
export class City {
    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty()
    @Prop()
    country: string;

    @ApiProperty()
    @Prop()
    continent: string;

    @ApiProperty()
    @Prop()
    population: number;

    [Symbol.iterator] = function* () {
        yield this.name;
        yield this.country;
        yield this.continent;
        yield this.population 
    }
}

export const CitySchema = SchemaFactory.createForClass(City);