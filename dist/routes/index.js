"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const utils_1 = require("../helpers/utils");
/* GET HomePage */
router.get("/", (req, res, next) => {
    (0, utils_1.sendResponse)(res, 200, true, {}, null, "Welcome to CoderManagement TypeScript.");
});
/* User API */
const user_api_1 = __importDefault(require("./user.api"));
router.use("/users", user_api_1.default);
/* Task API */
const task_api_1 = __importDefault(require("./task.api"));
router.use("/tasks", task_api_1.default);
exports.default = router;
