import Joi from "joi";

const assignTaskParamsSchema = Joi.object({
  userId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .required(),
  taskId: Joi.string()
    .trim()
    .pattern(/^[a-fA-F0-9]{24}$/) // MongoDB ObjectId
    .required(),
});

export { assignTaskParamsSchema };
