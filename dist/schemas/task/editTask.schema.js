"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTaskBodySchema = exports.editTaskParamsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const editTaskParamsSchema = joi_1.default.object({
    taskId: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.editTaskParamsSchema = editTaskParamsSchema;
const editTaskBodySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).optional(),
    description: joi_1.default.string().trim().min(1).max(500).optional(),
    status: joi_1.default.string()
        .valid("pending", "working", "review", "done", "archive")
        .default("pending")
        .optional(),
    user: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.editTaskBodySchema = editTaskBodySchema;
