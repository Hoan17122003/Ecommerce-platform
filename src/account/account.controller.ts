import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    Session,
    Req,
    Res,
    UseGuards,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { ParseIntPipe } from '@nestjs/common';
import { Request, Response } from 'express';

import { TaiKhoanDTO } from './dto/account.dto';
import { JwtAccessTokenGuard } from 'src/auth/guard/JwtAuth.guard';
import { Public } from 'src/decorators/auth.decorators';


@UseGuards(JwtAccessTokenGuard)
@Controller('Account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}


    @Public()
    @Post('signuplocal')
    async createAccount(@Body() data: any) {
        const {
            TenTaiKhoan,
            TenDangNhap,
            Email,
            MatKhau,
            VaiTro,
            AnhDaiDien,
            HoDem,
            Ten,
            SDT,
            NgayThangNamSinh,
            DiaChi,
        } = data;
        const taiKhoan: TaiKhoanDTO = {
            TenTaiKhoan,
            TenDangNhap,
            Email,
            MatKhau,
            VaiTro,
            AnhDaiDien,
        };
        return this.accountService.save(taiKhoan, HoDem, Ten, SDT, NgayThangNamSinh, DiaChi);
    }

    @Post(':id/:vaitro/changeInformation')
    async changeInformation(@Param('id', new ParseIntPipe()) id: number, @Param('vaitro') vaitro: string) {
        return this.accountService.changeInformation(id, vaitro);
    }

    @Get(':VaiTro/profile/:id')
    async getProfileById(
        @Param('id', new ParseIntPipe()) id: number,
        @Param('VaiTro') vaitro: string,
        @Session() session: Record<string, any>,
    ) {
        try {
            if (Number.parseInt(session.user.payload) != id) throw new ForbiddenException();
        } catch (error) {
            throw new ForbiddenException();
        }
        return this.accountService.profile(id,vaitro);
    }

    // @Post('/local/login')
    // async login(@Body() data: any, @Req() req: Request, @Res() res: Response) {
    //     const token = await this.accountService.login(data.username, data.password);
    //     return token;
    // }

    // @Get('testJWT')
    // test(@Req() req: Request, @Session() session: Record<string, any>) {

    //     return this.accountService.testJWT(session.token);
    // }
}
