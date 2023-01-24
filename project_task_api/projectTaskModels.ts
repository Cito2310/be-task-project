import { model, Schema } from "mongoose";
import { IProjectTask } from '../types/modelMongoDB';

const projectTaskSchema = new Schema<IProjectTask>({
    title: {type: String, required: true, lowercase: true},
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    tasks: [{
        type: Schema.Types.ObjectId, 
        ref: "Task"
    }],
})

projectTaskSchema.methods.toJSON = function() {
    const {__v , ...rest } = this.toObject();
    return rest;
}

export const ProjectTask = model("ProjectTask", projectTaskSchema);