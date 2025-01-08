import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import User from "../../models/User";
import Task from "../../models/Task";

const getUserTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    // Kiểm tra user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User Not Found", "Get user by ID error");
    }
    // Lấy danh sách task của user
    const tasks = await Task.find({ user: userId }).sort({
      createdAt: -1,
    });
    // Gửi kết quả
    sendResponse(
      res,
      200,
      true,
      tasks,
      null,
      "List of tasks found successfully"
    );
  } catch (err) {
    next(err);
  }
};

export default getUserTasks;
