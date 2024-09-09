const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createGallerySchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateGallerySchema = Joi.object({
  name: name,
  price: price,
  image: image
});

const getGallerySchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createGallerySchema,
  updateGallerySchema,
  getGallerySchema,
}
