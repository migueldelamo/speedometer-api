import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith('/api/v1/auth')) {
      next();
      return;
    }
    try {
      const token = req.headers.authorization as string;

      if (token) {
        const user = this.validateToken(token);
        if (user) {
          req['user'] = user;
        } else {
          throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      next();
    } catch {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async validateToken(token: string): Promise<Partial<User> | null> {
    const user = this.userService.findByToken(token);
    return user ?? null;
  }
}
