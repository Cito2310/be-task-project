import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { User } from "./userModels";

import { IBodyCreateUser, IBodyChangePassword } from '../types/routeBodyUser';

import { generatorJWT } from '../helpers/generatorJWT';

// Create User
export const createUser = async (req: Request, res: Response) => {
    try {
        const { _id, ...userData } = req.body as IBodyCreateUser;
    
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
        

    } catch (error) {
        return res.status(500).json([{
            msg: "1500 - unexpected server error"
        }])
    }
}


// ChangePassword - Need Token
export const changePassword = async (req: Request, res: Response) => {
    try {
        const { password } = req.body as IBodyChangePassword;
        const { _id } = req.user;

        // find user and update
        const userChangedPassword = await User.findByIdAndUpdate(
            _id, 
            { password }, 
            { new: true }
        )
        await userChangedPassword?.save();

        res.status(204).json([{
            msg: "password changed successfully"
        }])


    } catch (error) {
        return res.status(500).json([{
            msg: "1500 - unexpected server error"
        }])
    }
}