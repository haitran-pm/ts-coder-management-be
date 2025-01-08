"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTask_controller_1 = __importDefault(require("../controllers/task/createTask.controller"));
const getTasks_controller_1 = __importDefault(require("../controllers/task/getTasks.controller"));
const getTaskById_controller_1 = __importDefault(require("../controllers/task/getTaskById.controller"));
const editTask_controller_1 = __importDefault(require("../controllers/task/editTask.controller"));
const deleteTask_controller_1 = __importDefault(require("../controllers/task/deleteTask.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createTask_schema_1 = require("../schemas/task/createTask.schema");
const getTasks_schema_1 = require("../schemas/task/getTasks.schema");
const getTaskById_schema_1 = require("../schemas/task/getTaskById.schema");
const editTask_schema_1 = require("../schemas/task/editTask.schema");
const deleteTask_schema_1 = require("../schemas/task/deleteTask.schema");
const router = express_1.default.Router();
/**
 * @route POST /tasks
 * @description Create a new task
 * @access Public
 * @requiredBody
 * - name: string (required)
 * - description: string (required)
 * - status: string (optional)
 * - user: ObjectId (optional)
 */
router.post("/", (0, validateSchema_1.default)({ body: createTask_schema_1.createTaskBodySchema }), createTask_controller_1.default); // body
/**
 * @route GET /tasks
 * @description Get a list of tasks
 * @access Public
 * @allowedQueries
 * - name: string (optional)
 * - description: string (optional)
 * - status: string (optional)
 * - user: ObjectId (optional)
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get("/", (0, validateSchema_1.default)({ query: getTasks_schema_1.getTasksQuerySchema }), getTasks_controller_1.default); // query
/**
 * @route GET /tasks/:taskId
 * @description Get task by id
 * @access Public
 */
router.get("/:taskId", (0, validateSchema_1.default)({ params: getTaskById_schema_1.getTaskByIdParamsSchema }), getTaskById_controller_1.default); // params
/**
 * @route PATCH /tasks/:taskId
 * @description Edit task
 * @access Public
 * @requiredBody
 * - name: string (optional)
 * - description: string (optional)
 * - status: string (optional)
 * - user: ObjectId (optional)
 */
router.patch("/:taskId", (0, validateSchema_1.default)({ params: editTask_schema_1.editTaskParamsSchema, body: editTask_schema_1.editTaskBodySchema }), editTask_controller_1.default); // params; body
/**
 * @route DELETE /tasks/:taskId
 * @description Delete task
 * @access Public
 */
router.delete("/:taskId", (0, validateSchema_1.default)({ params: deleteTask_schema_1.deleteTaskParamsSchema }), deleteTask_controller_1.default); // params
exports.default = router;
