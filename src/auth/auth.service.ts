import {
    BadRequestException,
    ForbiddenException,
    Inject,
    Injectable,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { AccountService } from 'src/account/account.service';
import { AuthDTO } from './dto/auth.dto';
// import { LocalAuthGuard } from "./guard/LocalAuth.guard";

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) {}

    // async SignUpWithFaceBook() {}
    // async SignUpWithGoogle() {}

    async validate(username: string, password: string): Promise<any | null> {
        const taikhoan = await this.accountService.findOne(username);
        if (!taikhoan) throw new UnauthorizedException('Tên tài khoản không chính xác');
        if (taikhoan && (await this.verifyPlainContentwithHashedContent(taikhoan[0].MatKhau, password))) {
            const [MatKhau, ...result] = taikhoan;
            return result;
        }
        return null;
    }

    async signIn(DTO: AuthDTO): Promise<{ access_token: string; refresh_token: string }> {
        // xác thực tài khoản
        const taikhoan = await this.validate(DTO.username, DTO.password);
        if (!taikhoan) throw new UnauthorizedException('Sai thông tin đăng nhập');

        const token = await {
            access_token: this.generateAccessToken(taikhoan.TaiKhoanId),
            refresh_token: this.generateRefreshToken(taikhoan.TaiKhoanId),
        };
        return token;
    }

    private generateAccessToken(payload: string) {
        return this.jwtService.sign(
            { payload },
            {
                secret: 'access_token_secret',
                expiresIn: process.env.JWT_ACCESS_TOKEN_TIME,
            },
        );
    }

    private generateRefreshToken(payload: string) {
        return this.jwtService.sign(
            { payload },
            {
                secret: 'refresh_token_secret',
                expiresIn: process.env.JWT_REFRESH_TOKEN_TIME,
            },
        );
    }

    private async verifyPlainContentwithHashedContent(hashedPassword: string, plainText): Promise<boolean> {
        const isMatching = await argon.verify(hashedPassword, plainText);
        if (!isMatching) return false;
        return true;
    }

    // test(): string {
    //     return this.accountService.test();
    // }
}
