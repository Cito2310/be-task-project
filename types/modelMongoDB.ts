import { Schema, Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId,
    email: string,
    password: string,
    username: string,
}

export interface IProjectTask {
    _id: Types.ObjectId,
    title: string,
    collaborators: IUser[],
    admin: IUser,
    tasks: ITask[],
}

export interface ITask {
    _id: Types.ObjectId,
    description: string,
    projectID: Types.ObjectId,
    status: "to-do" | "in-progress" | "done",
    title: string,
}