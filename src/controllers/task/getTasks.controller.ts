import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import Task from "../../models/Task";

const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Tính toán phân trang
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    // Lấy các tham số tìm kiếm từ query
    const { name, description, status, user } = req.query;
    const filter: { [key: string]: any } = {};
    if (name) filter.name = { $regex: name, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    if (status) filter.status = status;
    if (user) filter.user = user;
    // Tìm toàn bộ user
    const listOfFound = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Gửi kết quả
    sendResponse(res, 200, true, listOfFound, null, "Tasks found successfully");
  } catch (err) {
    next(err);
  }
};

export default getTasks;
