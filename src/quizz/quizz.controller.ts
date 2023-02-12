import { Body, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { Response } from "express";
import { QuestionInGameDTO } from "./question/dto/question-in-game-dto.model";
import { Quizz } from "./quizz.model";
import { QuizzService } from "./quizz.service";

@Controller()
export class QuizzController {
    
    constructor(private readonly quizzService: QuizzService){}

    @Post()
    async create(@Res() response : Response, @Body() quizz: Quizz) {
        const newQuizz = await this.quizzService.create(quizz);
        return response.status(HttpStatus.CREATED).json({
            newQuizz
        })
    }

    @Get()
    async findAll(@Res() response: Response) {
        const quizzs = await this.quizzService.findAll();
        return response.status(HttpStatus.OK).json(
            quizzs
        )
    }

    @Get('/:id')
    async findById(@Res() response: Response, @Param('id') id: string) {
        const quizz = await this.quizzService.findById(id)
        return response.status(HttpStatus.OK).json(
            quizz
        )
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id: string, @Body() quizz: Quizz) {
        const updatedQuizz = await this.quizzService.update(id, quizz);
        return response.status(HttpStatus.OK).json(
            updatedQuizz
        )
    }

    @Put('/:idQuizz/add-question/:idQuestion')
    async addQuestion(@Res() response, @Param('idQuizz') idQuizz: string, @Param('idQuestion') idQuestion: string) {
        const updatedQuizz = await this.quizzService.addQuestion(idQuizz, idQuestion);
        return response.status(HttpStatus.OK).json(
            updatedQuizz
        )
    }

    @Put('/:idQuizz/remove-question/:idQuestion')
    async removeQuestion(@Res() response, @Param('idQuizz') idQuizz: string, @Param('idQuestion') idQuestion: string) {
        const updatedQuizz = await this.quizzService.removeQuestion(idQuizz, idQuestion);
        return response.status(HttpStatus.OK).json(
            updatedQuizz
        )
    }

    @Get('/:idQuizz/question/:numQuestion')
    async getQuestionFromQuizz(@Res() response, @Param('idQuizz') idQuizz: string, @Param('numQuestion') numQuestion: number) {
        const question = await this.quizzService.getQuestionFromQuizz(idQuizz, numQuestion);
        const questionInGameDTO : QuestionInGameDTO = {
            _id: question._id,
            label: question.label,
            possibleAnswers: question.badAnswers.concat(question.goodAnswer).sort()
        } 
        return response.status(HttpStatus.OK).json(
            questionInGameDTO
        )
    }


}