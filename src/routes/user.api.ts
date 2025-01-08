import express from "express";
import createUser from "../controllers/user/createUser.controller";
import getUsers from "../controllers/user/getUsers.controller";
import getUserById from "../controllers/user/getUserById.controller";
import getUserTasks from "../controllers/user/getUserTasks.controller";
import editUser from "../controllers/user/editUser.controller";
import assignTask from "../controllers/user/assignTask.controller";
import unassignTask from "../controllers/user/unassignTask.controller";
import deleteUser from "../controllers/user/deleteUser.controller";
import validateSchema from "../middleware/validateSchema";
import { createUserBodySchema } from "../schemas/user/createUser.schema";
import { getUsersQuerySchema } from "../schemas/user/getUsers.schema";
import { getUserByIdParamsSchema } from "../schemas/user/getUserById.schema";
import {
  getUserTasksParamsSchema,
  getUserTasksQuerySchema,
} from "../schemas/user/getUserTasks.schema";
import {
  editUserParamsSchema,
  editUserBodySchema,
} from "../schemas/user/editUser.schema";
import { assignTaskParamsSchema } from "../schemas/user/assignTask.schema";
import { unassignTaskParamsSchema } from "../schemas/user/unassignTask.schema";
import { deleteUserParamsSchema } from "../schemas/user/deleteUser.schema";

const router = express.Router();

/**
 * @route POST /users
 * @description Create a new user
 * @access Public
 * @requiredBody
 * - name: string (required)
 * - role: string (optional)
 */
router.post("/", validateSchema({ body: createUserBodySchema }), createUser); // body

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
router.get("/", validateSchema({ query: getUsersQuerySchema }), getUsers); // query

/**
 * @route GET /users/:userId
 * @description Get user by id
 * @access Public
 */
router.get(
  "/:userId",
  validateSchema({ params: getUserByIdParamsSchema }),
  getUserById
); // params

/**
 * @route GET /users/:userId/tasks
 * @description Get user's tasks
 * @access Public
 * @allowedQueries
 * - page: number (optional)
 * - limit: number (optional)
 */
router.get(
  "/:userId/tasks",
  validateSchema({
    params: getUserTasksParamsSchema,
    query: getUserTasksQuerySchema,
  }),
  getUserTasks
); // params; query

/**
 * @route PATCH /users/:userId
 * @description Edit user
 * @access Public
 * @requiredBody
 * - name: string (optional)
 * - role: tring (optional)
 */
router.patch(
  "/:userId",
  validateSchema({ params: editUserParamsSchema, body: editUserBodySchema }),
  editUser
); // params; body

/**
 * @route PATCH /users/:userId/tasks/:taskId/assign
 * @description Assign a task to an user
 * @access Public
 */
router.patch(
  "/:userId/tasks/:taskId/assign",
  validateSchema({ params: assignTaskParamsSchema }),
  assignTask
); // params

/**
 * @route PATCH /users/:userId/tasks/:taskId/unassign
 * @description Unassign a task from an user
 * @access Public
 */
router.patch(
  "/:userId/tasks/:taskId/unassign",
  validateSchema({ params: unassignTaskParamsSchema }),
  unassignTask
); // params

/**
 * @route DELETE /users/:userId
 * @description Delete user
 * @access Public
 */
router.delete(
  "/:userId",
  validateSchema({ params: deleteUserParamsSchema }),
  deleteUser
); // params

export default router;
