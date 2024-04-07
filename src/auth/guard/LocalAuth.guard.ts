import {
    Global,
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { TenDangNhap, MatKhau } = request.body;
        if (!TenDangNhap || !MatKhau) throw new UnauthorizedException();
        try {
            const payload = await this.authService.validate(TenDangNhap, MatKhau);
            request.session.payload = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
