import {Router} from "express"
import * as controller from "../controllers/task.controller";
const router: Router = Router();

// const controller = require("../controllers/task.controller");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const taskRoutes: Router = router;
