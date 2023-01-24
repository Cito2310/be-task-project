import { Request, Response } from "express";

import { Task } from './taskModels';
import { ProjectTask } from './projectTaskModels';


// POST - Create Task - Token
export const createTask = async (req: Request, res: Response) => {
    try {
        const { idProject } = req.params;
        const { title, description } = req.body;
        const { project } = req.user;

        // check project is user
        if ( !project.includes( idProject ) ) return res.status(401).json({msg: "Not authorized"})

        // create task
        const newTask = new Task({ projectID: idProject, title, description });

        // add task to project task
        const projectTask = await ProjectTask.findById(idProject);

        // check project not found
        if ( !projectTask ) return res.status(404).json({msg: "Project not found"})

        // push new task
        // @ts-ignore
        projectTask.tasks.push(newTask._id);

        // save task and project task
        await Promise.all([
            newTask.save(),
            projectTask.save()
        ])
       
        // return newTask
        return res.status(201).json(newTask);


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// PUT - Edit Task - Token and collaborators
export const editTask = async (req: Request, res: Response) => {
    try {
        const { _id, ...newData } = req.body;
        const { project } = req.user;
        const { idProject, idTask } = req.params;

        // check project is user
        if ( !project.includes( idProject ) ) return res.status(401).json({msg: "Not authorized"})

        try {
            // edit task
            const editTask = await Task.findByIdAndUpdate( idTask, newData, {new: true} );

            // not found exist
            if ( !editTask ) return res.status(404).json({msg: "Task not found"});

            // save task
            editTask.save();

            // return task
            return res.status(202).json(editTask);

        } catch (error) { return res.status(404).json({msg: "Task not found"}) }


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// DELETE - Delete Task - Token and collaborators
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { project } = req.user;
        const { idProject, idTask } = req.params;

        // check project is user
        if ( !project.includes( idProject ) ) return res.status(401).json({msg: "Not authorized"})

        // get project and task exist
        const [ projectExist, taskExist ] = await Promise.all([
            ProjectTask.findById(idProject),
            Task.findById(idTask)
        ]);

        // check project exist
        if ( !projectExist ) return res.status(404).json({msg: "Project not found"});
        if ( !taskExist ) return res.status(404).json({msg: "Task not found"});

        // check project have this task
        // @ts-ignore
        if ( !projectExist.tasks.includes( idTask ) ) return res.status(401).json({msg: "Not authorized delete task, project not have this task"});

        // // delete task and task in project
        await Task.findByIdAndDelete(idTask);
        // @ts-ignore
        projectExist.tasks = projectExist.tasks.filter((taskID: string) => !taskID.equals(idTask));

        await projectExist.save()

        // return
        return res.status(204).json({})


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}

// GET - Get all task in project
export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const { project } = req.user;
        const { idProject } = req.params;

        // check project is user
        if ( !project.includes( idProject ) ) return res.status(401).json({msg: "Not authorized"})

        // get project task
        const projectTask = await ProjectTask.findById( idProject );

        // check project exist
        if ( !projectTask ) return res.status(404).json({msg: "Project not found"});

        // return res
        return res.status(200).json(projectTask.tasks)


    } catch (error) {
        return res.status(500).json({
            msg: "1500 - unexpected server error"
        })
    }
}