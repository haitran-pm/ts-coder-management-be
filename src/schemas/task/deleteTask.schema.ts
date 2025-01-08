import Joi from "joi";

const deleteTaskParamsSchema = Joi.object({
  taskId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .optional(),
});

export { deleteTaskParamsSchema };
