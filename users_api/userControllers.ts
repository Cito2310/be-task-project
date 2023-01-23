import { Request, Response } from "express";
import { IBodyUser } from '../interfaces/bodyUser';
import bcryptjs from "bcryptjs";
import { User } from "./userModels";


export const createUser = async (req: Request, res: Response) => {
    const { _id, ...userData } = req.body as IBodyUser;

    // find user exist with email or username
    const [ existUsername, existEmail ] = await Promise.all([
        User.findOne({ username: userData.username }),
        User.findOne({ email: userData.email }),
    ])

    // check username or email not exist
    if ( existUsername ) return res.status(400).json([{msg: "0010 - username already exists"}])
    if ( existEmail ) return res.status(400).json([{msg: "0011 - email is already registered"}])

    // encrypt password
    const salt = bcryptjs.genSaltSync();
    userData.password = bcryptjs.hashSync( userData.password , salt)

    // create new user and save
    const newUser = new User(userData);
    await newUser.save();

    // return new user
    return res.json( newUser );
}