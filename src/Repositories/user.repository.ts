import User from "../Models/User";
import { IUser, ILogin } from "../Interfaces/User";

export const signUpRepository = (user: IUser) => User.create(user);

export const findUserByEmailRepository = (email: string) =>
  User.findOne({ email: email }).select("+password");
