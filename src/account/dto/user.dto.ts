import { IsEmpty, IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    HoDem: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 7)
    Ten: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    SDT: string;

    @IsNotEmpty()
    NgayThangNamSinh: Date;

    @IsString()
    DiaChi?: string;
}
