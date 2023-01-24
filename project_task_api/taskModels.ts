import { model, Schema } from "mongoose";
import { ITask } from '../types/modelMongoDB';

const taskChema = new Schema<ITask>({
    title: {
        type: String, 
        required: true, 
        lowercase: true
    },
    description: {
        type: String, 
        required: true
    },
    projectID: {
        type: Schema.Types.ObjectId, 
        required: true
    },
    status: {
        type: String, 
        default: "to-do",
        enum: ["to-do", "in-progress", "done"]
    }
})

taskChema.methods.toJSON = function() {
    const {__v , ...rest } = this.toObject();
    return rest;
}

export const Task = model("Task", taskChema);