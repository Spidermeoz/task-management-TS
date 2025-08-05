import {Request, Response} from "express"
import Task from "../models/tasks.models";

export const index = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false,
  });

  res.json(tasks);
}

export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  
  const tasks = await Task.find({
    _id: id,
    deleted: false,
  });

  res.json(tasks);
}