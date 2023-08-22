import { Router } from "express";
const router = Router();

import { signUpController, loginController } from "../Controllers/user.controller";

router.post("/sign-up", signUpController);
router.post("/login", loginController);

export default router;
