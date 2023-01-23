import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { User } from "./userModels";

import { IBodyUser } from '../types/bodyUser';

import { generatorJWT } from '../helpers/generatorJWT';


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

    // generator JWT
    const token: string = await generatorJWT({ id: newUser._id });

    // return new user
    return res.json({ user: newUser, token });
}