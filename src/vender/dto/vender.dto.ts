import { IsNotEmpty, Length, MaxDate, isDate, isDateString } from 'class-validator';

export class VenderDTO {
    @Length(1, 7)
    @IsNotEmpty()
    Ten: string;

    @Length(1, 20)
    @IsNotEmpty()
    HoDem: string;

    @Length(9, 9)
    @IsNotEmpty()
    SDT: string;

    @MaxDate(new Date(Date.now()))
    @IsNotEmpty()
    NgayThangNamSinh: Date;

    @IsNotEmpty()
    DiaChi: string;
}
