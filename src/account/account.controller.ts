import { Controller, Post, Body, Param, Get, Session, Req, Res, UseGuards } from "@nestjs/common";
import { AccountService } from "./account.service";
import { ParseIntPipe } from "@nestjs/common";
import { Request, Response } from "express";

@Controller('Account')
export class AccountController {

    constructor(private readonly accountService: AccountService) { }

    @Post('signuplocal')
    async createAccount(@Body() data: any) {
        console.log('data:', data)
        const { TenTaiKhoan, TenDangNhap, Email, MatKhau, VaiTro, AnhDaiDien, HoDem, Ten, SDT, NgayThangNamSinh, DiaChi } = data;
        return this.accountService.save(TenTaiKhoan, TenDangNhap, Email, MatKhau, VaiTro, AnhDaiDien, HoDem, Ten, SDT, NgayThangNamSinh, DiaChi);
    }

    @Post(':id/:vaitro/changeInformation')
    async changeInformation(@Param('id', new ParseIntPipe()) id: number, @Param('vaitro') vaitro: string) {
        return this.accountService.changeInformation(id, vaitro);
    }

    @UseGuards()
    @Get('profile/:id')
    async getProfileById(@Param('id', new ParseIntPipe()) id: number) {
        return this.accountService.profile(id)
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