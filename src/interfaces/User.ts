import { UserRoles } from "../types";
import { ObjectId } from "mongoose";

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRoles;
  photo?: string;
  myPlaylists: Array<IPlaylist>;
}

export interface UserTokenModel extends Document {
  userId: ObjectId;
  token: string;
  createdAt: Date;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILyric {
  artist: string;
  musicName: string;
  musicLyric: string;
  translate: string;
  badwords: string;
}

export interface IPlaylist {
  playlistId: string;
  playlistName: string;
  playlistLyrics: ILyric[];
}
