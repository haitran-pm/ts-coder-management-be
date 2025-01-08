import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import Task from "../../models/Task";

const getTaskById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    // Tìm task theo ID
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError(404, "Task Not Found", "Get task by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, task, null, "Task found successfully");
  } catch (err) {
    next(err);
  }
};

export default getTaskById;
