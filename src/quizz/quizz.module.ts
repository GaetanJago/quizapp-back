import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestionSchema } from "./question/question.model";
import { QuestionModule } from "./question/question.module";
import { QuizzController } from "./quizz.controller";
import { QuizzSchema } from "./quizz.model";
import { QuizzService } from "./quizz.service";


@Module({
    imports: [ MongooseModule.forFeature([{ name: 'Quizz', schema: QuizzSchema}]), QuestionModule],
    controllers: [QuizzController],
    providers: [QuizzService]
})
export class QuizzModule {}