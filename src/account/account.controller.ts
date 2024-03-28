import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { AccountService } from "./account.service";
import { ParseIntPipe } from "@nestjs/common";

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

    @Get('profile/:id')
    async getProfileById(@Param('id', new ParseIntPipe()) id: number) {
        return this.accountService.profile(id)
    }

}