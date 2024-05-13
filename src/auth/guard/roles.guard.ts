import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorators/auth.decorators';

import { ROLES, Roles } from 'src/decorators/role.decoratos';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflactor: Reflector,
        private readonly authService: AuthService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('2...');
        const roles: string[] = await this.reflactor.getAllAndOverride(ROLES, [
            context.getHandler(),
            context.getClass(),
        ]);
        const isPublic = this.reflactor.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;
        const request = context.switchToHttp().getRequest();
        const vaitro = this.authService.findById(request.session.user.payload);
        return roles.includes((await vaitro).VaiTro);
    }
}
