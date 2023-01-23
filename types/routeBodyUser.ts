import { Types } from "mongoose";

export interface IBodyCreateUser {
    _id?: Types.ObjectId,
    username: string,
    password: string,
    email: string,
}

export interface IBodyChangePassword {
    password: string,
}