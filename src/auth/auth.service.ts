import { BadRequestException, ForbiddenException, Inject, Injectable, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from 'argon2';


import { AccountService } from "src/account/account.service";
// import { LocalAuthGuard } from "./guard/LocalAuth.guard";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService
    ) {
    }

    async SignUpWithFaceBook() {

    }
    async SignUpWithGoogle() {

    }

    async validate(username: string, password: string): Promise<any | undefined> {
        try {

            const taikhoan = await this.accountService.findOne(username)
            if (!taikhoan) throw new UnauthorizedException('Tên tài khoản không chính xác');
            await this.verifyPlainContentwithHashedContent(taikhoan[0].MatKhau, password);

            const payload = {
                sub: taikhoan[0].TaiKhoanId,
                username: taikhoan[0].TenTaiKhoan
            }
            return {
                access_token: await this.jwtService.signAsync(payload, {

                })
            };


        } catch (error) {
            throw new Error(error);
        }
    }

    async signIn(id: string): Promise<{ access_token: string, refresh_token: string }> {
        return {
            access_token: this.generateAccessToken(id),
            refresh_token: this.generateRefreshToken(id)
        }
    }

    private generateAccessToken(payload) {
        return this.jwtService.sign(payload, {
            secret: 'access_token_secret',
            expiresIn: `${process.env.JWT_ACCESS_TOKEN_TIME}s`
        });
    }

    private generateRefreshToken(payload) {
        return this.jwtService.sign(payload, {
            secret: 'refresh_token_secret',
            expiresIn: `${process.env.JWT_REFRESH_TOKEN_TIME}s`
        });
    }

    private async verifyPlainContentwithHashedContent(hashedPassword: string, plainText) {
        const isMatching = await argon.verify(hashedPassword, plainText);
        if (!isMatching) throw new BadRequestException();

    }

    test(): string {
        return this.accountService.test();
    }




}