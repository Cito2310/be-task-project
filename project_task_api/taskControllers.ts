import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { generatorJWT } from '../helpers/generatorJWT';

// POST - Create Task - Token
export const createTask = async (req: Request, res: Response) => {
    return res.status(501)
}

// GET - Get All Task by ID Project - Token
export const getAllTasks = async (req: Request, res: Response) => {
    return res.status(501)
}

// PUT - Edit Task - Token and collaborators
export const editTask = async (req: Request, res: Response) => {
    return res.status(501)
}

// PUT - Delete Task - Token and collaborators
export const deleteTask = async (req: Request, res: Response) => {
    return res.status(501)
}