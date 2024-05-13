import {
    Controller,
    Get,
    Body,
    Post,
    Res,
    Req,
    UseGuards,
    HttpStatus,
    UnauthorizedException,
    ForbiddenException,
    Session,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as session from 'express-session';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/LocalAuth.guard';
import { JwtAccessTokenGuard } from './guard/JwtAccessAuth.guard';
import { Public } from 'src/decorators/auth.decorators';
import { JwtRefreshTokenGuard } from './guard/JwtRefreshAuth.guard';

@UseGuards(JwtAccessTokenGuard)
@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login/local')
    async login(@Req() request: Request, @Res() res: Response, @Session() session: Record<string, any>) {
        try {
            const token = await this.authService.signIn(session.payload);
            return res.status(HttpStatus.OK).json({ token });
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }
    @Public()
    @Get('Verify-Token')
    verifyToken(@Req() requests: Request, @Session() session: Record<string, any>) {
        try {
            const token = requests.rawHeaders[1].slice(7);
            return this.authService.verifyToken(token);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    @Get()
    async test() {
        return this.authService.findById(2040);
    }

    @Public()
    @UseGuards(JwtRefreshTokenGuard)
    @Get('get-access-token')
    async generateAccessToken(@Res() res: Response, @Session() session: Record<string, any>) {
        return res.status(201).json({ accessToken: this.authService.generateAccessToken(session.token.payload) });
    }

    // @Public()
    // @Post('SendMail')
    // async sendMail(@Body() data: Record<string, any>) {
    //     return this.mailService.sendUserConfirmation({
    //         email: data.email,
    //         subject: data.subject,
    //         content: data.content,
    //     });
    //     // return SendMail(data.email,data.subject,data.content)
    //     // return 'hehehe';
    // }
}
