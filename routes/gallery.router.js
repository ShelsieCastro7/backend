const express = require('express');
const GalleryService = require('./../services/gallery.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createGallerySchema, updateGallerySchema, getGallerySchema } = require('./../schemas/gallery.schema');

const router = express.Router();
const service = new GalleryService();

router.get('/', async (req, res) => {
  const gallery = await service.find();
  res.json(gallery);
});
router.get('/:id',
  validatorHandler(getGallerySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const gallery =  await service.findOne(id);
      res.json(gallery);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createGallerySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newImage = await service.create(body);
    res.status(201).json(newImage);
  }
);
router.patch('/:id',
  validatorHandler(getGallerySchema, 'params'),
  validatorHandler(updateGallerySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params; //se desestructura el id de los params de la url
      const body = req.body;
      const image = await service.update(id, body);
      res.json(image);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id', async (req, res) => {
  const { id } = req.params; //se desestructura el id de los params de la url
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
