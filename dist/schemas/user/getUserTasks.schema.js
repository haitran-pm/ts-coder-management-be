"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTasksQuerySchema = exports.getUserTasksParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const getUserTasksParamsSchema = joi_1.default.object({
    userId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.getUserTasksParamsSchema = getUserTasksParamsSchema;
const getUserTasksQuerySchema = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1).optional(),
    limit: joi_1.default.number().integer().min(1).max(100).default(10).optional(),
});
exports.getUserTasksQuerySchema = getUserTasksQuerySchema;
