import { NextFunction, Response } from "express";
import { decryptDataByPrivateKey } from "../../../lib/rsa.lib";
import { UserReq } from "../payload/request/user.req";
import { CACHENAME, MemCache } from "../../../lib/cache.lib";
import { Validation } from "../validations/client.validate";
import { ResponseBase, ResponseStatus } from "../payload/Res/response.payload";
import { getExistUserByUsername, saveUser } from "../repository/user.repository";
import { IUserModelToUserResponse } from "../payload/Res/clientOauth.res";
import { DefaultUserData } from "../model/user.model";
import { BcriptHash } from "../../../lib/hash.lib";

export const handleUserRegister = async (
    user: UserReq,
    res: Response,
    next: NextFunction) => {

    await MemCache.getItemFromCacheBy(CACHENAME.PRIVATEKEY).then((privateKey) => {
        console.log(user);
        if (privateKey) {
            const decryptData = decryptDataByPrivateKey(user.credential, privateKey);
            getExistUserByUsername(decryptData.username).then((existUser) => {
                if (existUser) {
                    console.log(existUser.username);
                    const _response =
                        ResponseBase(
                            ResponseStatus.FAILURE,
                            'Username already exist - please try again with other username');
                    return res.status(200).json(_response);
                }
                const userToStore =
                    DefaultUserData(
                        user.email,
                        user.fullname,
                        decryptData.username,
                        user.phone,
                        BcriptHash(decryptData.password),
                        user.permission,
                        user.userId);
                // Handle crate new user
                saveUser(userToStore).then((user) => {
                    const userResponse = IUserModelToUserResponse(user);
                    const _response =
                        ResponseBase(
                            ResponseStatus.SUCCESS,
                            'Register success',
                            { userResponse });
                    res.status(201).json(_response);
                }).catch((error) => {
                    const _response = ResponseBase(ResponseStatus.ERROR, error.message);
                    return res.status(500).json(_response);
                });
            }).catch((err) => {
                const _response =
                    ResponseBase(
                        ResponseStatus.ERROR,
                        'Query database failure',
                        err.message);
                return res.status(500).json(_response);
            });
        }
    }).catch((decriptError) => {
        console.log(decriptError);
        const response = ResponseBase(
            ResponseStatus.ERROR,
            decriptError.message);
        return res.status(500).json(response);

    }).catch((memoryCacheError) => {
        const response = ResponseBase(
            ResponseStatus.ERROR,
            memoryCacheError.message);
        return res.status(500).json(response);
    });
};
