import { IsEmail, IsNotEmpty, MaxLength, IsStrongPassword, IsEmpty, isEnum, IsOptional } from 'class-validator';
import { AccountRole } from './account.enum';
import { Transform } from 'stream';

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

    @IsOptional()
    @IsEmpty()
    AnhDaiDien: string;

    @IsNotEmpty()
    VaiTro: string;
}
