import { describe, expect, test } from "@jest/globals";
import {
  passwordPattern,
  encryptPassword
} from "../Middlewares/PasswordMiddleware";

describe("password pattern module", () => {
  test("valid password pattern", () => {
    expect(passwordPattern("123456781#")).toBe(true);
  });

  test("encrypt password before insertion into database", async () => {
    const generateHash = await encryptPassword("123456781#");
    expect(generateHash).toHaveProperty("hashPassword");
  });
});
