import { Controller, Get, Body, Post, Res, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { } from '../account/dto/account.dto'
import { Request, Response } from "express";
import { AuthDTO } from "./dto/auth.dto";
// import { RequestWithUser } from 'src/types/requests.type';

import { LocalAuthGuard } from "./guard/LocalAuth.guard";

@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Get('signup')
    async signUp(@Body() data: any) {
        // return this.authService.signUp();    
    }

    // @UseGuards(LocalAuthGuard)
    @Post('login/local')
    async login(@Req() request: Request, @Res() res: Response) {
        const { user } = request;
        return await this.authService.test();
    }

    // @Get('test')
    // test(@Res() res: Response) {
    //     return res.status(200).json({ data: this.authService.test() });
    // }

}