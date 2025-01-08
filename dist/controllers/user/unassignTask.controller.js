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
const User_1 = __importDefault(require("../../models/User"));
const Task_1 = __importDefault(require("../../models/Task"));
const unassignTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, taskId } = req.params;
        // Kiểm tra user và task có tồn tại không
        const [user, task] = yield Promise.all([
            User_1.default.findById(userId),
            Task_1.default.findById(taskId),
        ]);
        if (!user) {
            throw new utils_1.AppError(404, "User Not Found", "Get user by ID error");
        }
        if (!task) {
            throw new utils_1.AppError(404, "Task Not Found", "Get task by ID error");
        }
        // Remove user from task
        const updatedTask = yield Task_1.default.findByIdAndUpdate({ _id: taskId }, { $unset: { user: "" } }, { new: true });
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 201, true, updatedTask, null, "User unassigned successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.default = unassignTask;
