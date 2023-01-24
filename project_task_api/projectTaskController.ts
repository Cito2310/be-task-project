import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { generatorJWT } from '../helpers/generatorJWT';

import { User } from '../users_api/userModels';
import { Task } from './taskModels';
import { ProjectTask } from './projectTaskModels';
import { IUser } from '../types/modelMongoDB';

// POST - Create Project Task - Token
export const createProjectTask = async (req: Request, res: Response) => {
    try {
        // check title project
        const existProductWithTitle = await ProjectTask.findOne({
            title: req.body.title.toLowerCase(),
            collaborators: req.user._id
        })
        if ( existProductWithTitle ) return res.status(400).json({msg: "you already have a project with this title"})

        // create new project
        const newProjectTask = new ProjectTask({
            title: req.body.title,
            collaborators: [req.user._id],
            admin: req.user._id,
        });

        // save new project
        await newProjectTask.save();

        // return new project
        return res.status(201).json(newProjectTask);


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// GET - Get Project Task by User - Token
export const getProjectsTasksUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user as IUser;

        // find project task
        const findProjectTask = await ProjectTask.find({
            collaborators: _id
        })

        // return project task
        return res.status(200).json(findProjectTask)


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// GET - Get One Project Task by ID - Token
export const getProjectTaskID = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user as IUser;
        const { idProject } = req.params;

        // find project task
        const findProjectTask = await ProjectTask.find({
            _id: idProject,
            collaborators: _id
        })

        // return project task
        return res.status(200).json(findProjectTask)


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// PUT - Project Task by ID - Change Collaborators - Token and admin
export const changeCollaborators = async (req: Request, res: Response) => {
    try {
        const { idProject, action, idNewUser } = req.params;
        const { _id, email, password, project, requestCollaborator, username } = req.user as IUser;
    
        // action add collaborator
        if (action === "add") {
            // check project already exist
            const newUser = await User.findById(idNewUser);

            
        }

        // action delete collaborator
        if (action === "sub") {

        } 
        

    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// PUT - Project Task by ID - Change Title - Token and admin
export const changeTitle = async (req: Request, res: Response) => {
    return res.status(501)
}

// Delete - Project Task by ID - Delete project task - Token and admin
export const deleteProjectTask = async (req: Request, res: Response) => {
    return res.status(501)
}

// try {
        


// } catch (error) {
//     return res.status(500).json({
//         msg: "1500 - unexpected server error"
//     })
// }