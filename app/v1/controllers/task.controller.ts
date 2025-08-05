import { Request, Response } from "express";
import Task from "../models/tasks.models";

import paginationHelper from "../../../helpers/pagination";
import searchHelper from "../../../helpers/search";

export const index = async (req: Request, res: Response) => {
  // Find
  interface Find {
    deleted: boolean;
    status?: string;
    title?: RegExp;
  }
  const find: Find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status.toString();
  } // End Find

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toLocaleString();
    sort[sortKey] = req.query.sortValue;
  } // End Sort

  // Search
  const objectSearch = searchHelper(req.query);

  if (objectSearch.keyword) {
    find["title"] = objectSearch["regex"];
  } // End search

  //Pagination
  let initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTasks = await Task.countDocuments(find);

  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTasks
  ); // End Pagination

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

  res.json(tasks);
};

export const detail = async (req: Request, res: Response) => {
  const id = req.params.id;

  const tasks = await Task.find({
    _id: id,
    deleted: false,
  });

  res.json(tasks);
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
      errors: error
    });
  }
};
