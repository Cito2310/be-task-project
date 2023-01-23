import { model, Schema } from "mongoose";
import { IProjectTask } from '../types/modelMongoDB';

const projectTaskSchema = new Schema<IProjectTask>({
    title: {type: String, required: true, lowercase: true},
    collaborators: [{
        type: Schema.Types.ObjectId, 
        required: true
    }],
    admin: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId, 
    }],
})

projectTaskSchema.methods.toJSON = function() {
    const {__v , ...rest } = this.toObject();
    return rest;
}

export const ProjectTask = model("ProjectTask", projectTaskSchema);