import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Question } from "./question/question.model";
import { QuestionService } from "./question/question.service";
import { Quizz, QuizzDocument } from "./quizz.model";


@Injectable()
export class QuizzService {
    constructor(@InjectModel(Quizz.name) private quizzModel: Model<QuizzDocument>,
                private readonly questionService: QuestionService) {}

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

    async delete(id: string) {
        return this.quizzModel.findByIdAndRemove(id);
    }

    async addNewQuestion(id: string, question: Question) {
        const idQuestion: string = (await this.questionService.create(question))._id;
        await this.addQuestion(id, idQuestion);
        return idQuestion;
    }

    async addQuestion(idQuizz: string, idQuestion: string) {
        return this.quizzModel.findByIdAndUpdate(idQuizz, {$addToSet: { questions: idQuestion }}, {new: true})
    }

    async removeQuestion(idQuizz: string, idQuestion: string) {
        return this.quizzModel.findByIdAndUpdate(idQuizz, {$pull: { questions: idQuestion }}, {new: true})
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