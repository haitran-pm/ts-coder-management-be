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
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        // Tìm và xóa mềm
        const deletedTask = yield Task_1.default.findByIdAndUpdate(taskId, { isDeleted: true }, { new: true });
        if (!deletedTask) {
            throw new utils_1.AppError(404, "Task Not Found", "Delete task by ID error");
        }
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, null, null, "Task deleted successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.default = deleteTask;
