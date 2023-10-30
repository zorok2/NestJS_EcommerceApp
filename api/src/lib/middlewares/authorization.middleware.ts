/* eslint-disable prettier/prettier */
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MiddlewaresVarible, UserMetadata } from './ middlewares.variable';
import { DynamicApiRoleService } from '../../modules/dynamic-role/services/dynamic-role.service';
import { ResponseBase, ResponseStatus } from 'src/shared/payload/response-base';

@Injectable()
export class AuthorizationRequestMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthorizationRequestMiddleware.name);
  constructor(private readonly dynamicApiRoleService: DynamicApiRoleService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req[MiddlewaresVarible.IsPassAll]) {
      return next();
    }
    const userMetadataFromToken = req[
      MiddlewaresVarible.UserMetadata
    ] as UserMetadata;
    req['userId'] = userMetadataFromToken.userId;

    const canActive = await this.dynamicApiRoleService.canAccessEndpoint(
      req,
      userMetadataFromToken,
    );
    this.logger.debug('Can active', canActive);
    if (canActive) {
      return next();
    }

    return res
      .status(403)
      .json(
        new ResponseBase(
          ResponseStatus.Failure,
          'This user can"t access this endpoint',
        ),
      );
  }
}
