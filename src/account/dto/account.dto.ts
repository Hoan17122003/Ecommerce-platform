import { IsEmail, isString, Length, isNumber, IsNotEmpty, MaxLength, IsStrongPassword } from 'class-validator';

export class TaiKhoanDTO {

    
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @MaxLength(100)
    TenTaiKhoan: string;

    @IsNotEmpty()
    @MaxLength(100)
    TenDangNhap: string;

    @IsNotEmpty()
    @IsStrongPassword()
    MatKhau: string;

    @IsNotEmpty()
    vaitro: string;

    AnhDaiDien: string;
    constructor() {}
}
