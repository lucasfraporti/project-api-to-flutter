const express = require('express');
const mongoose = require('mongoose');

const routeRestaurante = require('./routes/restaurante');

const middleware = require('./middleware/middleware');

const App = express();
const port = 3000;

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/app_restaurante')
.then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.log(error);
});

App.use(middleware.trataLog);
App.use(routeRestaurante);

App.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
});