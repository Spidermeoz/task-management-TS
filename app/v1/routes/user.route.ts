import { Router } from "express";
import * as controller from "../controllers/user.controller";
const router: Router = Router();

// const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", controller.register);

export const userRoutes: Router = router;
