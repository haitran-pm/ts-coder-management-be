import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import User from "../../models/User";

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    // Tìm user theo ID
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User Not Found", "Get user by ID error");
    }
    // Gửi kết quả
    sendResponse(res, 200, true, user, null, "User found successfully");
  } catch (err) {
    next(err);
  }
};

export default getUserById;
