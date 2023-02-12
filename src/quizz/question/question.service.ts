import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question, QuestionDocument } from "./question.model";


@Injectable()
export class QuestionService {
    constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>) {}

    async create(question: Question) : Promise<Question> {
        const newQuestion = new this.questionModel(question);
        return newQuestion.save();
    }

    async findAll() : Promise<Question[]> {
        return this.questionModel.find().exec();
    }

    async findById(id: string) : Promise<Question> {
        return this.questionModel.findById(id).exec();
    }

    async update(id: string, question: Question) {
        return this.questionModel.findByIdAndUpdate(id, question, {new: true});
    }

}