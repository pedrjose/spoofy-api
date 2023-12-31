import * as bcrypt from "bcrypt";

export const encryptPassword = async (password: string) => {
  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
};

export const passwordPattern = (password: string) => {
  const pattern = /[^a-zA-Z0-9\s]/;
  const patternNumber = /\d/;

  if (pattern.test(password) && patternNumber.test(password)) {
    return true;
  }

  return false;
};
