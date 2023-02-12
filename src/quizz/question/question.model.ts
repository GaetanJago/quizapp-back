import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type QuestionDocument = HydratedDocument<Question>

@Schema()
export class Question {
    _id: string;

    @Prop({required: true, type: String})
    label: string;

    @Prop({required: true, type: String})
    goodAnswer: string;

    @Prop({required: true, type: [String]})
    badAnswers: string[];

    @Prop({required: true, default: 0, type: Number})
    nbGoodAnswer: number

    @Prop({required: true, default: 0, type: Number})
    nbBadAnswer: number

    @Prop({required: false, type: Number})
    difficulty: number
}

export const QuestionSchema = SchemaFactory.createForClass(Question);