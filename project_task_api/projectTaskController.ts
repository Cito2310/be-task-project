import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { generatorJWT } from '../helpers/generatorJWT';

// POST - Create Project Task - Token
export const createProjectTask = async (req: Request, res: Response) => {
    return res.status(501)
}

// GET - Get Project Task by User - Token
export const getProjectsTasksUser = async (req: Request, res: Response) => {
    return res.status(501)
}

// GET - Get One Project Task by ID - Token
export const getProjectTaskID = async (req: Request, res: Response) => {
    return res.status(501)
}

// PUT - Project Task by ID - Change Collaborators - Token and admin
export const changeCollaborators = async (req: Request, res: Response) => {
    return res.status(501)
}

// PUT - Project Task by ID - Change Title - Token and admin
export const changeTitle = async (req: Request, res: Response) => {
    return res.status(501)
}

// Delete - Project Task by ID - Delete project task - Token and admin
export const deleteProjectTask = async (req: Request, res: Response) => {
    return res.status(501)
}