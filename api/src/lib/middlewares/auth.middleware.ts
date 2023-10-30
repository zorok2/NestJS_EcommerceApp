/* eslint-disable prettier/prettier */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';
import { MiddlewaresVarible } from './ middlewares.variable';
import { DynamicApiRoleService } from 'src/modules/dynamic-role/services/dynamic-role.service';
import { JWTService } from 'src/modules/user/services/jwt.service';

@Injectable()
export class AutheticatedRequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AutheticatedRequestMiddleware.name);
  constructor(
    private readonly dynamicApiRoleService: DynamicApiRoleService,
    private readonly jwtService: JWTService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    this.logger.log(request.headers);
    if (
      request.headers.authorization &&
      request.headers.authorization.length !== 0
    ) {
      return request.headers.authorization.toString();
    }
    return undefined;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    // TODO: Handle authenticate;
    const isPermittedEndpoint =
      await this.dynamicApiRoleService.isPublicEndpoint(req);
    this.logger.debug(req.url);

    if (isPermittedEndpoint) {
      req[MiddlewaresVarible.IsPassAll] = true;
      return next();
    }

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      return res
        .status(400)
        .json(
          new ResponseBase(
            ResponseStatus.Failure,
            'Authorization header empty',
          ),
        );
    }

    this.logger.debug(token);
    try {
      const userData = await this.jwtService.verifyToken(token);
      this.logger.debug(userData);
      const userId = userData.userId;

      req[MiddlewaresVarible.UserMetadata] = userData;

      return next();
    } catch (error) {
      return res
        .status(500)
        .json(new ResponseBase(ResponseStatus.Failure, error.message));
    }
  }
}
