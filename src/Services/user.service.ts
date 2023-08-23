import * as bcrypt from "bcrypt";
import { PartialSession } from "../Types/user.types";
import { encodeSession } from "../Middlewares/EncodeMiddleware";
import { TAlgorithm, decode } from "jwt-simple";
import { Session } from "../Interfaces/Session";

import {
  passwordPattern,
  encryptPassword
} from "../Middlewares/PasswordMiddleware";

import {
  signUpRepository,
  findUserByEmailRepository
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

  await signUpRepository({ email, password, avatar });

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
