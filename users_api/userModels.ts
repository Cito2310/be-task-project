import { model, Schema, Types } from "mongoose";

export interface IUser {
    email: string,
    password: string,
    username: string,

    _id: Types.ObjectId,
}

const userSchema = new Schema<IUser>({
    email: {type: String, required: true, lowercase: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
})

userSchema.methods.toJSON = function() {
    const {__v , password, ...rest } = this.toObject();
    return rest;
}

export const User = model("User", userSchema);