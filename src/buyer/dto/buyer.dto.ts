import { IsNotEmpty, Length, MaxDate, MinDate } from 'class-validator';

export class BuyerDTO {
    @IsNotEmpty()
    Ten: string;

    @IsNotEmpty()
    HoDem: string;

    @Length(9, 9)
    @IsNotEmpty()
    SDT: string;

    @MaxDate(new Date(Date.now()))
    @IsNotEmpty()
    NgayThangNamSinh: Date;
}
