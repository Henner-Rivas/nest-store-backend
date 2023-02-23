import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public.decortator';
import { ROLES_KEY } from 'src/auth/decorators/roles.decortator';
import { Role } from 'src/auth/models/roles.model';
import { PayloadToken } from 'src/auth/models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    const isAuth = roles.some((role) => role === user.role);

    if (!isAuth) {
      throw new UnauthorizedException('your role is unathorized');
    }
    return isAuth;
  }
}
