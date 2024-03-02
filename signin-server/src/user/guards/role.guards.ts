import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/roles.enums';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()) || [];
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
