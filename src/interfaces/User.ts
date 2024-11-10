import { UserRoles } from "../types";
import { ObjectId } from "mongoose";
import { IContentReview, IContentReviewPlaylist } from './ContentReview';

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

export interface IPlaylist{
  playlistName: string;
  playlistLyrics: IContentReviewPlaylist[];
}

