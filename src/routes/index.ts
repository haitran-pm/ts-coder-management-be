import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import { sendResponse } from "../helpers/utils";

/* GET HomePage */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  sendResponse(
    res,
    200,
    true,
    {},
    null,
    "Welcome to CoderManagement TypeScript."
  );
});

/* User API */
import userAPI from "./user.api";
router.use("/users", userAPI);

/* Task API */
import taskAPI from "./task.api";
router.use("/tasks", taskAPI);

export default router;
