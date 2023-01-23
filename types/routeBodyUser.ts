import { Types } from "mongoose";

export interface IBodyCreateUser {
    _id?: Types.ObjectId,
    username: string,
    password: string,
    email: string,
}

export interface IBodyChangeDataUser {
    _id?: Types.ObjectId,
    username?: string,
    email?: string,
    password?: string,
}