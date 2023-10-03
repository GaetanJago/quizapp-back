import { Body, Controller, UseGuards, Post, Request, Get, HttpStatus, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';
import { LocalAuthGuard } from './local-auth-guard';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Res() response, @Body() user) {        
        return response.status(HttpStatus.OK).json(await this.authService.login(user))
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
