const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const configs = require('./config');

// db.authenticate()
//     .then(() => console.log('connected'))
//         .catch(error => console.log(error))

//load router
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
    return next();
});

app.listen(3000);