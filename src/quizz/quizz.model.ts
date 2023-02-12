import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { Question } from "./question/question.model";

export type QuizzDocument = HydratedDocument<Quizz>

@Schema()
export class Quizz {

    _id: string;

    @Prop({required: true, type: String})
    title: string;

    @Prop({type: [{type: SchemaTypes.ObjectId, ref: Question.name}]})
    questions: Question[];

    @Prop({required: true, type: [Number]})
    scores: number[]
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);