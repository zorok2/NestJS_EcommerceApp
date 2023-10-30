import mongoose from "mongoose";
import User, { IUser } from "../model/user.model";

export const saveUser = (_user: IUser) => {
  const userToStore = new User({
    _id: new mongoose.Types.ObjectId(),
    fullname: _user.fullname,
    avatar: _user.avatar,
    email: _user.email,
    phone: _user.phone,
    username: _user.username,
    password: _user.password,
    permission: _user.permission,
    userId: _user.userId,
    initTime: new Date(),
  });
  return userToStore.save();
};

export const getUserByUsername = (_username: string) => {
  return User.findOne({
    username: _username,
  });
};
export const getExistUserByUsername = (_username: string) => {
  return User.findOne({
    username: _username,
  }).select(["username"]);
};
