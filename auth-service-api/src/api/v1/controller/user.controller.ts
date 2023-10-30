import { NextFunction, Request, Response } from "express";
import { UserReq } from "../payload/request/user.req";
import { handleUserRegister } from "../services/user.service";

export const saveUser = (req: Request, res: Response, next: NextFunction) => {
    const userReq: UserReq = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        credential: req.body.credential,
        permission: req.body.permission,
        userId: req.body.userId,
    };
    console.log('Call api to auth service');
    return handleUserRegister(userReq, res, next);
}
export const getUserBy = (req: Request, res: Response, next: NextFunction) => {
    res.json({ "message": "OKe" });
}
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    res.json({ "message": "OKe" });
}
export const deleteUserBy = (req: Request, res: Response, next: NextFunction) => {
    res.json({ "message": "OKe" });
}