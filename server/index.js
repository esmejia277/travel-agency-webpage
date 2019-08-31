const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const configs = require('./config');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
require('dotenv').config({ path: 'vars.env' })

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes());

//load pug templates
app.set('view engine', 'pug');

//add views
app.set('views', path.join(__dirname, './views'));

//load statics
app.use(express.static('public'));

// validate if i am in dev or prod mode
const config = configs[app.get('env')];

// save the env
app.locals.mode = config.name;


//show actual year
app.use((req, res, next) => {
    const date = new Date();
    //save value in local
    res.locals.actualDate = date.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host, () => {
    console.log('working!!');
});