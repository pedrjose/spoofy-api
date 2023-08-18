import User from "../Models/User";
import { IUser } from "../Interfaces/User";

export const signUpRepository = (user: IUser) => User.create(user);
