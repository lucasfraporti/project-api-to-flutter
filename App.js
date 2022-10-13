const express = require('express');
const mongoose = require('mongoose');
const routeRestaurante = require('./routes/restaurante');
const routeUser = require('./routes/user');
const routeLogin = require('./routes/login');
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
App.use('/api/login', routeLogin);
// App.use(middleware.validaToken);
App.use('/api/restaurante', routeRestaurante);
App.use('/api/users', routeUser);

App.listen(port, () => {
    console.log(`Ativo na porta: ${port}`);
});