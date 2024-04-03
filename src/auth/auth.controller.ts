import { Controller, Get, Body, Post, Res, Req, UseGuards, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {} from '../account/dto/account.dto';
import { Request, Response } from 'express';
import { AuthDTO } from './dto/auth.dto';
// import { RequestWithUser } from 'src/types/requests.type';

import { LocalAuthGuard } from './guard/LocalAuth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login/local')
    async login(@Req() request: Request, @Res() res: Response) {
        try {
            const { MatKhau, TenDangNhap } = request.body;
            const account: AuthDTO = {
                username: TenDangNhap,
                password: MatKhau,
            };
            const token = await this.authService.signIn(account);
            return res.status(HttpStatus.OK).json({ token });
        } catch (error) {
            
            throw new UnauthorizedException(error);
        }
    }
}
