import express from 'express';
import { SecurityController } from '../controller/security.controller';
import { RateLimit } from '../middleware/ratelimit.middleware';
import { appClientAuthFillter } from '../middleware/authentication.middleware';

const securityRoute = express.Router();

securityRoute.post(
    '/app-client/oauth',
    RateLimit(5, 10),
    SecurityController.appClientAuthenticate);

securityRoute.post(
    '/user/oauth/token',
    SecurityController.userRefreshToken);

securityRoute.post(
    '/user/oauth/logout',
    SecurityController.userSignOut);

securityRoute.post(
    '/user/oauth',
    SecurityController.userAuthenticate);

securityRoute.post(
    '/user/auth/token/role',
    appClientAuthFillter,
    SecurityController.validateToken,
)
export default securityRoute;