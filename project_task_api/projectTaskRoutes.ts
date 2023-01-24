import { Router } from "express";
import { check } from "express-validator";

import { checkFields } from '../middlewares/checkFields';
import { validateJWT } from '../middlewares/validateJWT';

import { changeTitle, createProjectTask, deleteProjectTask, getProjectsTasksUser, getProjectTaskID } from "./projectTaskController";
import { createTask, deleteTask, editTask, getAllTasks } from "./taskControllers";


export const routeProjectTask = Router();


// // ROUTES FOR MANAGER PROJECT TASK
// route create new project task - JWT
routeProjectTask.post("/",[
    validateJWT,

    check("title", "0020 - title of the project is required").trim().notEmpty(),
    check("title", "0021 - title of the project is string").trim().isString(),
    check("title", "0022 - title of the project can only be less than 24 characters").trim().isLength({max: 24}),

    checkFields
], createProjectTask)

// route change title project task - JWT
routeProjectTask.put("/:idProject",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),

    check("title", "0020 - title of the project is required").trim().notEmpty(),
    check("title", "0021 - title of the project is string").trim().isString(),
    check("title", "0022 - title of the project can only be less than 24 characters").trim().isLength({max: 24}),

    checkFields
], changeTitle)

// route delete project task - JWT
routeProjectTask.delete("/:idProject",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),

    checkFields
], deleteProjectTask)

// route get project task to user - JWT
routeProjectTask.get("/",[ validateJWT ], getProjectsTasksUser)

// route get project task with id - JWT
routeProjectTask.get("/:idProject",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),

    checkFields
], getProjectTaskID)


// // ROUTES FOR MANAGER TASK
// create new task in project
routeProjectTask.post("/:idProject",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),

    check("title", "title is required").trim().notEmpty(),
    check("title", "title not is string").trim().isString(),
    check("title", "title length can only be greater than 2 and less than 24 characters").trim().isLength({min: 2, max: 24}),

    check("description", "description is required").trim().notEmpty(),
    check("description", "description not is string").trim().isString(),
    check("description", "description length can only be greater than 6 and less than 300 characters").trim().isLength({min: 6, max: 300}),

    checkFields
], createTask)

routeProjectTask.delete("/:idProject/:idTask",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),
    check("idTask", "idProject invalid").isMongoId(),

    checkFields
], deleteTask)

routeProjectTask.put("/:idProject/:idTask",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),
    check("idTask", "idProject invalid").isMongoId(),

    check("title", "title is required").optional().trim().notEmpty(),
    check("title", "title not is string").optional().trim().isString(),
    check("title", "title length can only be greater than 2 and less than 24 characters").optional().trim().isLength({min: 2, max: 24}),

    check("description", "description is required").optional().trim().notEmpty(),
    check("description", "description not is string").optional().trim().isString(),
    check("description", "description length can only be greater than 6 and less than 24 characters").optional().trim().isLength({min: 6, max: 300}),

    check("status", "status not valid ( to-do | in-progress | done )").optional().custom( newStatus => {
        if (!['to-do', 'in-progress', 'done'].includes( newStatus )) throw new Error();
        return true;
    }),

    checkFields
], editTask)

routeProjectTask.get("/:idProject/task",[
    validateJWT,

    check("idProject", "idProject invalid").isMongoId(),

    checkFields
], getProjectTaskID)