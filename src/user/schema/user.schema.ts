import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, SchemaType } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @ApiProperty()
    @Prop({required: true, unique: true})
    name: string;

    @ApiProperty()
    @Prop({required: true})
    age: number;

    @ApiProperty()
    @Prop({required: true})
    password: string;

    @Prop({required: false})
    refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);