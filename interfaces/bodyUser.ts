import { Types } from "mongoose";

export interface IBodyUser {
    _id?: Types.ObjectId,
    username: string,
    password: string,
    email: string,
}