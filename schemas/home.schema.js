const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(30);
const description = Joi.string().min(10).max(255);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createServiceSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
});

const updateServiceSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
});

const getServiceSchema = Joi.object({
  id: id.required(),
});

module.exports = { createServiceSchema, updateServiceSchema, getServiceSchema };
