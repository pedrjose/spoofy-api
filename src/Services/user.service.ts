import {
  passwordPattern,
  encryptPassword
} from "../Middlewares/PasswordMiddleware";

import { signUpRepository } from "../Repositories/user.repository";

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
