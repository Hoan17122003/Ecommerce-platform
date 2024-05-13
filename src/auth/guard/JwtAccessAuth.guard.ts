import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import * as session from 'express-session';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { IS_PUBLIC_KEY } from 'src/decorators/auth.decorators';

@Injectable()
export class JwtAccessTokenGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) return true;

        console.log('1...');
        const request = context.switchToHttp().getRequest();
        // const token = this.extractTokenFromHeader(request);
        const token = request.rawHeaders[1].slice(7);
        if (!token) throw new ForbiddenException();
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
            throw new ForbiddenException(error);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers['Authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
