import * as Joi from "joi";

export const createProjectModel = Joi.object().keys({
  name: Joi.string().required(),
  users: Joi.array().required(),
  tasks: Joi.array().optional(),
  description: Joi.string().required()
});

export const updateProjectModel = Joi.object().keys({
  name: Joi.string().required(),
  users: Joi.array().required(),
  tasks: Joi.array().optional(),
  description: Joi.string().required()
});
