"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createTaskBodySchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(1).max(255).required(),
    description: joi_1.default.string().trim().min(1).max(500).required(),
    status: joi_1.default.string()
        .valid("pending", "working", "review", "done", "archive")
        .default("pending")
        .optional(),
    user: joi_1.default.string()
        .trim()
        .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
        .optional(),
});
exports.createTaskBodySchema = createTaskBodySchema;
