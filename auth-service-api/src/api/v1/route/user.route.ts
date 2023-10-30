import express from 'express';
import { getUserBy, updateUser, deleteUserBy, saveUser } from '../controller/user.controller';
import { appClientAuthFillter } from '../middleware/authentication.middleware';
import { RateLimit } from '../middleware/ratelimit.middleware';

const userRoute = express.Router();

userRoute.post(
    '/user',
    saveUser);

userRoute.get(
    '/user',
    appClientAuthFillter,
    getUserBy);

userRoute.put(
    '/user',
    updateUser);

userRoute.delete(
    '/user',
    appClientAuthFillter,
    deleteUserBy);

export default userRoute;