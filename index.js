const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomerrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json());
const whithelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whithelist.includes(origin)){
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

routerApi(app);

app.use(logErrors); //se ejecutan en el orden que estan escritas
app.use(boomerrorHandler);
app.use(errorHandler);

app.get('/users', (req, res) =>{
  const { limit, offset } = req.query;
  if (limit && offset) { //validamos que existen
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros.');
  }
});

app.get('/categories', (req, res) => {
  res.json([
    {
      name: 'product',
      price: 1000
    },
    {
      name: 'product 2',
      price: 3000
    }
  ]);
});
//las rutas especificas van antes de las dinamicas para que no choquen
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'product',
    price: 1000
  });
});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json(
    {
      categoryId,
      productId,
    }
  );
});

app.listen(port, () => {
  console.log('Mi port'+port);
});
