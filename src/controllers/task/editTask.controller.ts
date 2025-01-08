import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import Task from "../../models/Task";

const editTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;
    // Lấy task hiện tại từ database để kiểm tra status
    const task = await Task.findById(taskId);
    if (!task) {
      throw new AppError(404, "Task Not Found", "Update task by ID error");
    }
    // Logic xử lý status
    if (
      task.status === "done" &&
      updates.status &&
      updates.status !== "archive"
    ) {
      throw new AppError(
        400,
        "Bad Request",
        "Task with status done can't be changed to other value except archive"
      );
    }
    // Tìm và update, sau đó trả về object sau khi update
    const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, updates, {
      new: true,
    });
    if (!updatedTask) {
      throw new AppError(404, "Task Not Found", "Update task by ID error");
    }
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      updatedTask,
      null,
      "Task updated successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default editTask;
