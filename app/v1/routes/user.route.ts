import { Router } from "express";
import * as controller from "../controllers/user.controller";
const router: Router = Router();

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", controller.register);

router.post("/login", controller.login); // Thêm validate sau

router.get("/detail", authMiddleware.requireAuth, controller.detail);

export const userRoutes: Router = router;
