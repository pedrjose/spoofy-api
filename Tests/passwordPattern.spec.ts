import { describe, expect, test } from "@jest/globals";
import { passwordPattern } from "../src/Middlewares/PasswordMiddleware";

describe("password pattern module", () => {
  test("valid password pattern", () => {
    expect(passwordPattern("123456781#")).toBe(true);
  });
});
