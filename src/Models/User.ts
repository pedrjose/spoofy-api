import mongoose from "mongoose";
import { IUser } from "../Interfaces/User";
import { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String,
    required: true
  }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
