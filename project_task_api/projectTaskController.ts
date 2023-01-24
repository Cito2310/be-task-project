import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import { generatorJWT } from '../helpers/generatorJWT';

import { User } from '../users_api/userModels';
import { Task } from './taskModels';
import { ProjectTask } from './projectTaskModels';
import { IUser, IProjectTask } from '../types/modelMongoDB';

// POST - Create Project Task - Token
export const createProjectTask = async (req: Request, res: Response) => {
    try {
        // check title project
        const existProductWithTitle = await ProjectTask.findOne({
            title: req.body.title.toLowerCase(),
            creator: req.user._id
        })
        if ( existProductWithTitle ) return res.status(400).json({msg: "you already have a project with this title"})

        // create new project
        const newProjectTask = new ProjectTask({
            title: req.body.title,
            creator: req.user._id
        });

        // add project to user
        const findUser = await User.findById(req.user._id);
        // @ts-ignore
        findUser?.project.push(newProjectTask._id);
        findUser?.save();

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

// // GET - Get Project Task by User - Token
export const getProjectsTasksUser = async (req: Request, res: Response) => {
    try {
        const { _id } = req.user as IUser;

        // get projects
        const user = await User.findById(_id).populate("project");

        // exist user
        if ( !user ) return res.status(404).json({msg: "9404 - User not found"});

        // return project task
        return res.status(200).json(user.project)


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// GET - Get One Project Task by ID - Token
export const getProjectTaskID = async (req: Request, res: Response) => {
    try {
        const { project } = req.user;
        const { idProject } = req.params;

        // check project is user
        if ( !project.includes(idProject) ) return res.status(401).json({msg: "Not authorized"})

        // find project task
        const findProjectTask = await ProjectTask.findById( idProject ).populate("tasks");

        // check project exist
        if ( !findProjectTask ) return res.status(404).json({msg: "3404 - Project not found"});

        // return project task
        return res.status(200).json(findProjectTask);


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// PUT - Project Task by ID - Change Title - Token and admin
export const changeTitle = async (req: Request, res: Response) => {
    try {
        const { idProject } = req.params;
        const { project } = req.user;

        // check project is user
        if ( !project.includes(idProject) ) return res.status(401).json({msg: "Not authorized"})
        
        // check exist project
        const existProject = await ProjectTask.findById(idProject);
        if ( !existProject ) return res.status(404).json({msg: "3404 - Project not found"});

        // change title and save
        existProject.title = req.body.title;
        await existProject.save();

        // return new project
        return res.status(202).json(existProject);


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// // Delete - Project Task by ID - Delete project task - Token and admin
export const deleteProjectTask = async (req: Request, res: Response) => {
    try {
        const { idProject } = req.params;
        const { project } = req.user;

        // check project is user
        if ( !project.includes( idProject ) ) return res.status(401).json({msg: "Not authorized"})

        // check exist project
        const existProject = await ProjectTask.findById(idProject);
        if ( !existProject ) return res.status(404).json({msg: "3404 - Project not found"});

        // change title and save
        existProject.title = req.body.title;
        await existProject.save();

        // return new project
        return res.status(202).json(existProject);


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}


// export const nameController = async (req: Request, res: Response) => {
//     try {
        

//     } catch (error) {
//         return res.status(500).json({
//             msg: "1500 - unexpected server error"
//         })
//     }
// }