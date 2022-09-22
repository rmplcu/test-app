import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
    @ApiProperty()
    @Prop()
    question: string;

    @ApiProperty()
    @Prop()
    answer: string;

    @Prop()
    userId: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);