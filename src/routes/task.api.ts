import express from "express";
import createTask from "../controllers/task/createTask.controller";
import getTasks from "../controllers/task/getTasks.controller";
import getTaskById from "../controllers/task/getTaskById.controller";
import editTask from "../controllers/task/editTask.controller";
import deleteTask from "../controllers/task/deleteTask.controller";
import validateSchema from "../middleware/validateSchema";
import { createTaskBodySchema } from "../schemas/task/createTask.schema";
import { getTasksQuerySchema } from "../schemas/task/getTasks.schema";
import { getTaskByIdParamsSchema } from "../schemas/task/getTaskById.schema";
import {
  editTaskParamsSchema,
  editTaskBodySchema,
} from "../schemas/task/editTask.schema";
import { deleteTaskParamsSchema } from "../schemas/task/deleteTask.schema";

const router = express.Router();

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
router.post("/", validateSchema({ body: createTaskBodySchema }), createTask); // body

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
router.get("/", validateSchema({ query: getTasksQuerySchema }), getTasks); // query

/**
 * @route GET /tasks/:taskId
 * @description Get task by id
 * @access Public
 */
router.get(
  "/:taskId",
  validateSchema({ params: getTaskByIdParamsSchema }),
  getTaskById
); // params

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
router.patch(
  "/:taskId",
  validateSchema({ params: editTaskParamsSchema, body: editTaskBodySchema }),
  editTask
); // params; body

/**
 * @route DELETE /tasks/:taskId
 * @description Delete task
 * @access Public
 */
router.delete(
  "/:taskId",
  validateSchema({ params: deleteTaskParamsSchema }),
  deleteTask
); // params

export default router;
