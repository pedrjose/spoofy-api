import User from "../models/User";
import { IUser, IPlaylist } from "../interfaces/User";
import { ObjectId } from "mongodb";

export const signUpRepository = (user: IUser) => User.create(user);

export const findUserByEmailRepository = (email: string) =>
  User.findOne({ email: email }).select("+password");

export const findUserByIdRepository = (id: ObjectId) => User.findById(id);

export const createPlaylistRepository = (
  id: ObjectId,
  newPlaylist: IPlaylist
) => {
  return User.findOneAndUpdate(
    { _id: id },
    { $push: { myPlaylists: newPlaylist } }
  );
};

export const updateUserByIdRepository = (id: ObjectId, user: IUser) =>
  User.findByIdAndUpdate(id, user, { new: true });
