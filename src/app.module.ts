import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './quizz/question/question.module';
import { QuizzModule } from './quizz/quizz.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


const routes : Routes = [
  {
    path: '/api',
    children: [
      {
        path: '/quizz',
        module: QuizzModule
      },
      {
        path: '/question',
        module: QuestionModule
      },
      {
        path: '/auth',
        module: AuthModule
      },
      {
        path: '/user',
        module: UserModule
      }
    ]
  }
  
]

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/quizapp'),
    RouterModule.register(routes),
    QuizzModule,
    QuestionModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
