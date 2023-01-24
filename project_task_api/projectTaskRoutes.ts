import { Router } from "express";
import { check } from "express-validator";

import { checkFields } from '../middlewares/checkFields';
import { validateJWT } from '../middlewares/validateJWT';

import { changeCollaborators, changeTitle, createProjectTask, deleteProjectTask, getProjectsTasksUser, getProjectTaskID } from "./projectTaskController";
import { createTask, deleteTask, editTask, getAllTasks } from "./taskControllers";


export const routeProjectTask = Router();


// ROUTES FOR MANAGER PROJECT TASK
// route create new project task - JWT
// routeProjectTask.post("/",[
//     validateJWT,

//     check("title", "0020 - title of the project is required").trim().notEmpty(),
//     check("title", "0021 - title of the project is string").trim().isString(),
//     check("title", "0022 - title of the project can only be less than 24 characters").trim().isLength({max: 24}),

//     checkFields
// ], createProjectTask);

// // route get project task - JWT
// routeProjectTask.get("/", [
//     validateJWT,
// ], getProjectsTasksUser);

// // route get project task with id - JWT
// routeProjectTask.get("/:idProject", [
//     validateJWT,

//     check("idProject", "0024 - id project invalid").isMongoId(),

//     checkFields
// ], getProjectTaskID);

// // route change collaborators - JWT Admin
// routeProjectTask.put("/:idProject/collaborators/:action/:idNewUser", [
//     validateJWT,

//     check("idProject", "0024 - id project invalid").isMongoId(),

//     check("action", "0023 - action not valid ( add - sub )").custom( action => {
//         if (!['add', 'sub'].includes( action )) throw new Error();
//         return true;
//     }),

// ], changeCollaborators)

// // route change title - JWT Admin
// routeProjectTask.put("/:idProject/title", [
//     validateJWT,

//     check("idProject", "0024 - id project invalid").isMongoId(),

//     check("title", "0020 - title of the project is required").trim().notEmpty(),
//     check("title", "0021 - title of the project is string").trim().isString(),
//     check("title", "0022 - title of the project can only be less than 24 characters").trim().isLength({max: 24}),

//     checkFields
// ], changeTitle)


// // route delete project task with id - JWT Admin
// routeProjectTask.delete("/:idProject", [
//     validateJWT,

//     check("idProject", "0024 - id project invalid").isMongoId(),

//     checkFields
// ], deleteProjectTask)



// // ROUTES FOR MANAGER TASK
// // route create new task - JWT
// routeProjectTask.post("/:idProject/task",[
//     validateJWT,

//     check("idProject", "0024 - id project invalid").isMongoId(),

//     check("title", "0026 - title of the task is required").trim().notEmpty(),
//     check("title", "0027 - title of the task is string").trim().isString(),
//     check("title", "0028 - title of the task can only be less than 24 characters").trim().isLength({max: 24}),

//     check("description", "0026 - description of the task is required").trim().notEmpty(),
//     check("description", "0027 - description of the task is string").trim().isString(),
//     check("description", "0028 - description of the task can only be less than 24 characters").trim().isLength({max: 24}),

//     checkFields
// ], createTask)

// // route get all task to project - JWT
// routeProjectTask.get("/:idProject/task",[
//     validateJWT,

//     check("idProject", "0024 - id project invalid").isMongoId(),

//     checkFields
// ], getAllTasks)

// // route edit task - JWT
// routeProjectTask.put("/:idProject/task/:idTask",[
//     validateJWT,

//     check("idTask", "0025 - id task invalid").isMongoId(),

//     check("title", "0026 - title of the task is required").optional().trim().notEmpty(),
//     check("title", "0027 - title of the task is string").optional().trim().isString(),
//     check("title", "0028 - title of the task can only be less than 24 characters").optional().trim().isLength({max: 24}),

//     check("description", "0026 - description of the task is required").optional().trim().notEmpty(),
//     check("description", "0027 - description of the task is string").optional().trim().isString(),
//     check("description", "0028 - description of the task can only be less than 24 characters").optional().trim().isLength({max: 24}),

//     checkFields
// ], editTask)

// // route delete task - JWT
// routeProjectTask.delete("/:idProject/task/:idTask",[
//     validateJWT,

//     check("idTask", "0025 - id task invalid").isMongoId(),

//     checkFields
// ], deleteTask)