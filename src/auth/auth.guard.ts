import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Error as STError } from 'supertokens-node';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
import Session from 'supertokens-node/recipe/session';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const ctx = context.switchToHttp();

    let err = undefined;
    const resp = ctx.getResponse();
    await verifySession()(ctx.getRequest(), resp, (res) => {
      err = res;
    });

    const session = await Session.getSession(
      ctx.getRequest(),
      ctx.getResponse(),
    );
    const token = Object.values(session.getAccessTokenPayload());

    if (resp.headersSent) {
      throw new STError({
        message: 'RESPONSE_SENT',
        type: 'RESPONSE_SENT',
      });
    }

    if (err) {
      throw err;
    }

    if (requiredRoles !== undefined) {
      return requiredRoles.some((role) => token.includes(role));
    }
    return true;
  }
}
