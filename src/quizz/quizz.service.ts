import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Quizz, QuizzDocument } from "./quizz.model";


@Injectable()
export class QuizzService {
    constructor(@InjectModel(Quizz.name) private quizzModel: Model<QuizzDocument>) {}

    async create(quizz: Quizz) : Promise<Quizz> {
        const newQuizz = new this.quizzModel(quizz);
        return newQuizz.save();
    }

    async findAll() : Promise<Quizz[]> {
        return this.quizzModel.find().exec();
    }

    async findById(id: string) : Promise<Quizz> {
        return this.quizzModel.findById(id).populate({path: 'questions'});
    }

    async update(id: string, quizz: Quizz) {
        return this.quizzModel.findByIdAndUpdate(id, quizz, {new: true});
    }

    async addQuestion(idQuizz: string, idQuestion: string) {
        return this.quizzModel.findByIdAndUpdate(idQuizz, {$addToSet: { questions: idQuestion }}, {new: true})
    }

    async removeQuestion(idQuizz: string, idQuestion: string) {
        return this.quizzModel.findByIdAndUpdate(idQuizz, {$pop: { questions: idQuestion }}, {new: true})
    }

    async getQuestionFromQuizz(idQuizz: string, numQuestion: number) {
        const quizz = await this.quizzModel.findById(idQuizz).populate({path: 'questions'});
        return quizz.questions[numQuestion];
    }

    shuffleAnswers(array : string[]) : string[] {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
}