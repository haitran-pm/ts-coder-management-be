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
const getTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Tính toán phân trang
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // Lấy các tham số tìm kiếm từ query
        const { name, description, status, user } = req.query;
        const filter = {};
        if (name)
            filter.name = { $regex: name, $options: "i" };
        if (description)
            filter.description = { $regex: description, $options: "i" };
        if (status)
            filter.status = status;
        if (user)
            filter.user = user;
        // Tìm toàn bộ user
        const listOfFound = yield Task_1.default.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // Gửi kết quả
        (0, utils_1.sendResponse)(res, 200, true, listOfFound, null, "Tasks found successfully");
    }
    catch (err) {
        next(err);
    }
});
exports.default = getTasks;
