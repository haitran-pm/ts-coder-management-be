"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_controller_1 = __importDefault(require("../controllers/user/createUser.controller"));
const getUsers_controller_1 = __importDefault(require("../controllers/user/getUsers.controller"));
const getUserById_controller_1 = __importDefault(require("../controllers/user/getUserById.controller"));
const getUserTasks_controller_1 = __importDefault(require("../controllers/user/getUserTasks.controller"));
const editUser_controller_1 = __importDefault(require("../controllers/user/editUser.controller"));
const assignTask_controller_1 = __importDefault(require("../controllers/user/assignTask.controller"));
const unassignTask_controller_1 = __importDefault(require("../controllers/user/unassignTask.controller"));
const deleteUser_controller_1 = __importDefault(require("../controllers/user/deleteUser.controller"));
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const createUser_schema_1 = require("../schemas/user/createUser.schema");
const getUsers_schema_1 = require("../schemas/user/getUsers.schema");
const getUserById_schema_1 = require("../schemas/user/getUserById.schema");
const getUserTasks_schema_1 = require("../schemas/user/getUserTasks.schema");
const editUser_schema_1 = require("../schemas/user/editUser.schema");
const assignTask_schema_1 = require("../schemas/user/assignTask.schema");
const unassignTask_schema_1 = require("../schemas/user/unassignTask.schema");
const deleteUser_schema_1 = require("../schemas/user/deleteUser.schema");
const router = express_1.default.Router();
/**
 * @route POST /users
 * @description Create a new user
 * @access Public
 * @requiredBody
 * - name: string (required)
 * - role: string (optional)
 */
router.post("/", (0, validateSchema_1.default)({ body: createUser_schema_1.createUserBodySchema }), createUser_controller_1.default); // body
/**
 * @route GET /users
 * @description Get a list of users
 * @access Public
 * @allowedQueries
 * - name: string (optional)
 * - role: string (optional)
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get("/", (0, validateSchema_1.default)({ query: getUsers_schema_1.getUsersQuerySchema }), getUsers_controller_1.default); // query
/**
 * @route GET /users/:userId
 * @description Get user by id
 * @access Public
 */
router.get("/:userId", (0, validateSchema_1.default)({ params: getUserById_schema_1.getUserByIdParamsSchema }), getUserById_controller_1.default); // params
/**
 * @route GET /users/:userId/tasks
 * @description Get user's tasks
 * @access Public
 * @allowedQueries
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get("/:userId/tasks", (0, validateSchema_1.default)({
    params: getUserTasks_schema_1.getUserTasksParamsSchema,
    query: getUserTasks_schema_1.getUserTasksQuerySchema,
}), getUserTasks_controller_1.default); // params; query
/**
 * @route PATCH /users/:userId
 * @description Edit user
 * @access Public
 * @requiredBody
 * - name: string (optional)
 * - role: tring (optional)
 */
router.patch("/:userId", (0, validateSchema_1.default)({ params: editUser_schema_1.editUserParamsSchema, body: editUser_schema_1.editUserBodySchema }), editUser_controller_1.default); // params; body
/**
 * @route PATCH /users/:userId/tasks/:taskId/assign
 * @description Assign a task to an user
 * @access Public
 */
router.patch("/:userId/tasks/:taskId/assign", (0, validateSchema_1.default)({ params: assignTask_schema_1.assignTaskParamsSchema }), assignTask_controller_1.default); // params
/**
 * @route PATCH /users/:userId/tasks/:taskId/unassign
 * @description Unassign a task from an user
 * @access Public
 */
router.patch("/:userId/tasks/:taskId/unassign", (0, validateSchema_1.default)({ params: unassignTask_schema_1.unassignTaskParamsSchema }), unassignTask_controller_1.default); // params
/**
 * @route DELETE /users/:userId
 * @description Delete user
 * @access Public
 */
router.delete("/:userId", (0, validateSchema_1.default)({ params: deleteUser_schema_1.deleteUserParamsSchema }), deleteUser_controller_1.default); // params
exports.default = router;
