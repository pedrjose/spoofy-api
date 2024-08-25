import mongoose from "mongoose";
import { IUser } from "../interfaces/User";
import { IPlaylist } from "../interfaces/User";
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
  },
  myPlaylists: {
    type: Array<IPlaylist>,
    required: true
  }
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
