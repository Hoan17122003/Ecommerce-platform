import { IsEmail, isString, Length, isNumber } from 'class-validator';

export class TaiKhoanDTO {

    @IsEmail() Email: string
    TenTaiKhoan: string;
    TenDangNhap: string;
    @Length(10, 3000)
    MatKhau: string;
    vaitro: string;
    AnhDaiDien: string;
    constructor() {

    }
}