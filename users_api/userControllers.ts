import { Request, Response } from "express";
import { IBodyUser } from '../interfaces/bodyUser';


export const createUser = async (req: Request, res: Response) => {
    const { _id, password, ...userData } = req.body as IBodyUser;

    return res.json({ password, ...userData })
}