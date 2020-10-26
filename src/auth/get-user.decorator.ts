import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

// Extracts user object from request object
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
