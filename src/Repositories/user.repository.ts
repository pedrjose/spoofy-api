import User from "../Models/User";
import { IUser, IPlaylist } from "../Interfaces/User";

export const signUpRepository = (user: IUser) => User.create(user);

export const findUserByEmailRepository = (email: string) =>
  User.findOne({ email: email }).select("+password");

export const createPlaylistRepository = (
  id: string,
  newPlaylist: IPlaylist
) => {
  User.findOneAndUpdate(
    { _id: id },
    { $push: { myPlaylist: { newPlaylist } } }
  );
}; 