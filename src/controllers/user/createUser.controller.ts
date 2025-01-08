import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { sendResponse, AppError } from "../../helpers/utils";
import User from "../../models/User";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body;
    // Tạo user mới
    const created = await User.create(newUser);
    // Gửi trả kết quả
    sendResponse(res, 201, true, created, null, "User created successfully");
  } catch (err) {
    next(err);
  }
};

export default createUser;
