const express = require('express');
const app = express();
const urlRoute = require('./routes/urlRoutes');
const {handleRedirect} = require('./controllers/urlController');

app.use(express.json());
app.use('/api', urlRoute);
app.use('/:code', handleRedirect);

module.exports = app;