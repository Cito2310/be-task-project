import { Router } from "express";
import { check } from "express-validator";

import { getUser } from './routeController';


export const routeUser = Router();


routeUser.get("/", getUser);