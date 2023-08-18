import { Router } from "express";
const router = Router();

import { signUpController } from "../Controllers/user.controller";

router.post("/sign-up", signUpController);

export default router;
