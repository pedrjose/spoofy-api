import * as bcrypt from "bcrypt";
import { PartialSession } from "../Types/user.types";
import { encodeSession } from "../Middlewares/EncodeMiddleware";
import { TAlgorithm, decode } from "jwt-simple";
import { Session } from "../Interfaces/Session";
import { ILyric, IPlaylist, IUser } from "../Interfaces/User";
import { ObjectId } from "mongodb";

import {
  passwordPattern,
  encryptPassword
} from "../Middlewares/PasswordMiddleware";

import {
  signUpRepository,
  findUserByEmailRepository,
  createPlaylistRepository,
  findUserByIdRepository,
  updateUserByIdRepository
} from "../Repositories/user.repository";

export const signUpService = async (
  email: string,
  password: string,
  avatar: string
) => {
  if (!email || !password || !avatar)
    throw new Error("Submit all fields for registration");

  if (password.length < 10)
    throw new Error("Passwords must have at least 10 characters");

  if (!passwordPattern(password))
    throw new Error("Passwords must have special characters and numeric chars");

  const hashPassword = await encryptPassword(password);
  password = hashPassword;

  const myPlaylists: IPlaylist[] = [];

  await signUpRepository({ email, password, avatar, myPlaylists });

  return {
    message: "User created successfully!",
    promise: true
  };
};

export const loginService = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Input all fields for login");

  const user = await findUserByEmailRepository(email);

  if (!user) throw new Error("Email or password are wrong");

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) throw new Error("Email or Password are wrong");

  const partialSession: PartialSession = {
    id: Math.floor(Math.random() * 1000000),
    dateCreated: new Date().getTime(),
    username: user.email
  };

  const token = await encodeSession(
    `${process.env.SECRET_KEY}`,
    partialSession
  );

  if (!token) throw new Error("Authentication error. Try again!");

  return {
    message: "Login successful!",
    token,
    userId: user._id,
    email: user.email,
    promise: true
  };
};

export const authService = async (token: any) => {
  if (!token) throw new Error("Session has expired. Log in again!");

  const tokenDivider = token.split(" ");

  if (tokenDivider.length !== 2)
    throw new Error("Not authorization to do this!");

  const [schema, jwt] = tokenDivider;

  if (schema !== `${process.env.AUTH_SCHEMA}`)
    throw new Error("Not authorization to do this!");

  const algorithm: TAlgorithm = "HS512";

  const result: Session = await decode(
    jwt,
    `${process.env.SECRET_KEY}`,
    false,
    algorithm
  );

  if (!result) throw new Error("Session has expired. Log in again!");

  return { message: "Session is valid", promise: true };
};

export const createPlaylistService = async (
  id: ObjectId,
  playlistName: string
) => {
  if (!playlistName) throw new Error("Set a name for your new playlist!");

  const newPlaylistId = Math.floor(Date.now() * Math.random()).toString(36);

  const newPlaylist: IPlaylist = {
    playlistId: newPlaylistId,
    playlistName: playlistName,
    playlistLyrics: []
  };

  const insertNewPlaylist = await createPlaylistRepository(id, newPlaylist);

  if (!insertNewPlaylist) throw new Error("Create playlist error. Try again!");

  return { message: "Playlist created with successfully!" };
};

export const removePlaylistService = async (
  id: ObjectId,
  playlistId: string
) => {
  if (!playlistId)
    throw new Error("Set a ID for playlist that you want remove!");

  const findUser = await findUserByIdRepository(id);

  if (!findUser) throw new Error("Delete playlist error. Try again!");

  for (let i = 0; i < findUser.myPlaylists.length; i++) {
    if (findUser.myPlaylists[i].playlistId === playlistId) {
      findUser.myPlaylists.splice(i, i);

      await updateUserByIdRepository(id, findUser);

      return { message: "Playlist removed!" };
    }
  }

  throw new Error("Playlist not found. Check the ID!");
};

export const addLyricService = async (
  id: ObjectId,
  playlistId: string,
  lyric: ILyric
) => {
  const findUser = await findUserByIdRepository(id);

  if (!findUser) throw new Error("Add lyric at playlist error. Try again!");

  for (let i = 0; i < findUser.myPlaylists.length; i++) {
    if (findUser.myPlaylists[i].playlistId === playlistId) {
      findUser.myPlaylists[i].playlistLyrics.push(lyric);

      await updateUserByIdRepository(id, findUser);

      return { message: "Lyric added with successfully!" };
    }
  }

  throw new Error("Playlist not found. Check the ID!");
};

export const removeLyricService = async (
  id: ObjectId,
  playlistId: string,
  musicName: string
) => {
  const findUser = await findUserByIdRepository(id);

  if (!findUser) throw new Error("Add lyric at playlist error. Try again!");

  for (let i = 0; i < findUser.myPlaylists.length; i++) {
    if (findUser.myPlaylists[i].playlistId === playlistId) {
      for (let j = 0; j < findUser.myPlaylists[i].playlistLyrics.length; j++) {
        if (findUser.myPlaylists[i].playlistLyrics[j].musicName === musicName) {
          findUser.myPlaylists[i].playlistLyrics.splice(j, j);
        }
      }

      await updateUserByIdRepository(id, findUser);

      return { message: "Lyric removed with successfully!" };
    }
  }

  throw new Error("Playlist not found. Check the ID!");
};

export const findPlaylistByUserService = async (id: ObjectId) => {
  const findUser = await findUserByIdRepository(id);

  if (!findUser) throw new Error("Add lyric at playlist error. Try again!");

  return {
    message: "User finded successfully!",
    userplaylists: findUser.myPlaylists
  };
};

export const findPlaylistByIdService = async (
  id: ObjectId,
  playlistId: string
) => {
  const findUser = await findUserByIdRepository(id);

  if (!findUser) throw new Error("Add lyric at playlist error. Try again!");

  for (let i = 0; i < findUser.myPlaylists.length; i++) {
    if (findUser.myPlaylists[i].playlistId === playlistId) {
      return {
        message: "Playlist finded sucessfully!",
        playlist: findUser.myPlaylists[i]
      };
    }
  }

  return { message: "Playlist not found. Check the ID!" };
};
