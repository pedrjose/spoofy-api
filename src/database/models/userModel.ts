import mongoose, { Document } from "mongoose";
import { IUserModel, IPlaylist } from '../../interfaces/User';
import { Schema } from "mongoose";
import userTokenModel from "./userTokenModel";
import { USER_ROLES } from "../../types";

const PlaylistSchema: Schema = new Schema({
  playlistId: { type: String, required: true },
  playlistName: { type: String, required: true },
  playlistLyrics: [{ 
    musicId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
  }]
});

const UserSchema: Schema = new Schema<IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: USER_ROLES },
  photo: { type: String },
  myPlaylists: { type: [PlaylistSchema], required: true }
});

UserSchema.pre("findOneAndDelete", { document: true, query: true }, function middleware(next) {
  const id = this.getQuery()._id;
  userTokenModel.deleteMany({ userId: id }).exec();
  next();
});

const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;
