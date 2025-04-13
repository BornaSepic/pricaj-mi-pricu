
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity} from '../users/entities/user.entity';


export const User = createParamDecorator(
  (data: keyof UserEntity | undefined, ctx: ExecutionContext): UserEntity | null => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return null;
    }

    return data ? user?.[data] : user;
  },
);