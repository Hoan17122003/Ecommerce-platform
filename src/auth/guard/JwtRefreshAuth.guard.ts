import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshTokenGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requests = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(requests);
        if (!token) {
            return false;
        }
        return this.authService.findToken(token);
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
