import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';

import * as session from 'express-session';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { AccountService } from 'src/account/account.service';
import { use } from 'passport';

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        // const token = this.extractTokenFromHeader(request);
        const token = request.rawHeaders[1].slice(7);
        if (!token) throw new UnauthorizedException();
        request.session.token = token;
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
            });
            const taiKhoanId = payload.payload;
            const user = await this.authService.findById(Number.parseInt(taiKhoanId));
            if (!user) throw new ForbiddenException();

            request.session.user = payload;
        } catch (error) {
            throw new UnauthorizedException(error);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['Authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
