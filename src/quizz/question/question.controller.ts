import { Controller, Get, Res } from "@nestjs/common";
import { Body, Param, Post, Put } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { response, Response } from "express";
import { Question } from "./question.model";
import { QuestionService } from "./question.service";

@Controller()
export class QuestionController {

    constructor(private readonly questionService: QuestionService){}

    @Post()
    async create(@Res() response, @Body() question: Question) {
        const newQuestion = await this.questionService.create(question);
        return response.status(HttpStatus.CREATED).json(
            newQuestion
        )
    }

    @Get('')
    async findAll(@Res() response: Response) {
        const questions = await this.questionService.findAll();
        return response.status(HttpStatus.OK).json(
            questions
        )
    }

    @Get('/:id')
    async findById(@Res() response: Response, @Param('id') id: string) {
        const question = await this.questionService.findById(id)
        return response.status(HttpStatus.OK).json(
            question
        )
    }

    @Put('/:id')
    async update(@Res() response, @Param('id') id: string, @Body() question: Question) {
        const updatedQuestion = await this.questionService.update(id, question);
        return response.status(HttpStatus.OK).json(
            updatedQuestion
        )
    }

}