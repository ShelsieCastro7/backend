const express = require('express');
const homeRouter = require('./home.router');
const galleryRouter = require('./gallery.router');
// const loginRouter = require('./login.router');
// const registerRouter = require('./register.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/home', homeRouter);
  router.use('/gallery', galleryRouter);
  // app.use('/login', loginRouter);
  // app.use('/register', registerRouter);
}

module.exports = routerApi;
