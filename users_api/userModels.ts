import { model, Schema, Types } from "mongoose";
import { IUser } from '../types/user';

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