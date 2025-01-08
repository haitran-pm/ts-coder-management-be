import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import Task from "../../models/Task";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTask = req.body;
    // Tạo task mới
    const created = await Task.create(newTask);
    // Gửi kết quả
    sendResponse(res, 201, true, created, null, "Task created successfully");
  } catch (err) {
    next(err);
  }
};

export default createTask;
