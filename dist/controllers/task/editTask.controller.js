"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../helpers/utils");
const Task_1 = __importDefault(require("../../models/Task"));
const editTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const updates = req.body;
        // Lấy task hiện tại từ database để kiểm tra status
        const task = yield Task_1.default.findById(taskId);
        if (!task) {
            throw new utils_1.AppError(404, "Task Not Found", "Update task by ID error");
        }
        // Logic xử lý status
        if (task.status === "done" &&
            updates.status &&
            updates.status !== "archive") {
            throw new utils_1.AppError(400, "Bad Request", "Task with status done can't be changed to other value except archive");
        }
        // Tìm và update, sau đó trả về object sau khi update
        const updatedTask = yield Task_1.default.findOneAndUpdate({ _id: taskId }, updates, {
            new: true,
        });
        if (!updatedTask) {
            throw new utils_1.AppError(404, "Task Not Found", "Update task by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, updatedTask, null, "Task updated successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.default = editTask;
