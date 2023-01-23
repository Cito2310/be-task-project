import { model, Schema, Types } from "mongoose";

const projectTaskSchema = new Schema<IUser>({
    titleProject: {type: String, required: true, lowercase: true},
    collaborators: {
        type: [ Types.ObjectId ], 
        required: true
    },
    admin: {
        type: [ Types.ObjectId ],
        required: true
    },
    tasks: {
        type: [ Types.ObjectId ], 
        required: true
    },
})

projectTaskSchema.methods.toJSON = function() {
    const {__v , password, ...rest } = this.toObject();
    return rest;
}

export const ProjectTask = model("User", projectTaskSchema);