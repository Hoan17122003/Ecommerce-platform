import { IsEmail, IsNotEmpty, MaxLength, IsStrongPassword, IsEmpty, isEnum, IsOptional } from 'class-validator';


export class TaiKhoanDTO {
    @IsNotEmpty()
    @MaxLength(50)
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
