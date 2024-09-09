import { Router } from "express";

import { TestController } from "../controllers";

const router = Router();

/* GET hello */
router.get("/", TestController.hello);

export default router;