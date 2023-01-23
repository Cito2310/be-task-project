import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { User } from "./userModels";

import { IBodyCreateUser, IBodyChangeDataUser } from '../types/routeBodyUser';

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
        console.log(error)
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}


// ChangeDataUser - Need Token
export const ChangeDataUser = async (req: Request, res: Response) => {
    try {
        const { _id: id, ...newData } = req.body as IBodyChangeDataUser;
        const { _id, username, email, password } = req.user;


        // C H E C K S
        // check user data not is same ( email - password - username )
        if ( newData.email && email === newData.email ) return res.status(400).json({msg: "1400 - Equal email"});

        const validPassword = bcryptjs.compareSync( newData.password || "", password );
        console.log(validPassword, newData.password, password, req.user)
        if ( newData.password && validPassword ) return res.status(400).json({msg: "2400 - Equal password"});

        if ( newData.username && username === newData.username ) return res.status(400).json({msg: "3400 - Equal username"});

        // check user data already exist
        const [ existUsername, existEmail ] = await Promise.all([
            User.findOne({ username: newData.username }),
            User.findOne({ email: newData.email }),
        ])

        if ( existEmail ) return res.status(400).json({msg: "4400 - This email is already registered"});
        if ( existUsername ) return res.status(400).json({msg: "5400 - This username is already registered"});


        // CHANGE AND SAVE USER
        // change password && encrypt password
        if ( newData.password ) {
            const salt = bcryptjs.genSaltSync()
            newData.password = bcryptjs.hashSync(newData.password, salt)
        }

        // find user and update
        let userChanged: any;
        try {
            userChanged = await User.findByIdAndUpdate( _id, newData );
        } catch (error) {
            return res.status(404).json({ msg: "1404 - User not exist" });
        }

        // save user data
        await userChanged.save();

        // return
        return res.status(204).json()


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}