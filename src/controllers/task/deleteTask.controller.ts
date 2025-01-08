import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import Task from "../../models/Task";

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    // Tìm và xóa mềm
    const deletedTask = await Task.findByIdAndUpdate(
      taskId,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedTask) {
      throw new AppError(404, "Task Not Found", "Delete task by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, null, null, "Task deleted successfully");
  } catch (err) {
    next(err);
  }
};

export default deleteTask;
