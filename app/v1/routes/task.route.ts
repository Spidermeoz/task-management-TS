import {Router, Request, Response} from "express"
const router: Router = Router();

import Task from "../../../models/tasks.models";

// const controller = require("../controllers/task.controller");

router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });

  res.json(tasks);
});

router.get("/detail/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const tasks = await Task.find({
    _id: id,
    deleted: false,
  });

  res.json(tasks);
});

export const taskRoutes: Router = router;
