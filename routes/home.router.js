const express = require('express');
const HomeService = require('./../services/home.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createServiceSchema, updateServiceSchema, getServiceSchema } = require('./../schemas/home.schema');

const router = express.Router();
const service = new HomeService();

router.get('/', (req, res) => {
  res.send('Hola este es mi home');
});

router.get('/nuestros-servicios', async (req, res) => {
  const home = await service.find();
  res.json(home);
});

router.get('/nuestros-servicios/:id',
  validatorHandler(getServiceSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const home =  await service.findOne(id);
      res.json(home);
    } catch (error) {
      next(error);
    }
  }
);
router.post('/nuestros-servicios',
  validatorHandler(createServiceSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newService = await service.create(body);
    res.status(201).json(newService);
  }
);
router.patch('/nuestros-servicios/:id',
  validatorHandler(getServiceSchema, 'params'),
  validatorHandler(updateServiceSchema, 'body'),
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
router.delete('nuestros-servicios/:id', async (req, res) => {
  const { id } = req.params; //se desestructura el id de los params de la url
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
