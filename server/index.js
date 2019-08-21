const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');

//load router
app.use('/', routes());

//load pug templates
app.set('view engine', 'pug');

//add views
app.set('views', path.join(__dirname, './views'));

//load statics
app.use(express.static('public'));

app.listen(4000);