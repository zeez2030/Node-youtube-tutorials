const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;
//body-parser Middleware 

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


//check connection
db.once('open', () => {
    console.log('connected to mongo db');
})
//check for db errors
db.on('error', (err) => {
    console.log(err);
})

//bring in the models
let article = require('./models/article');


//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true

}));

//express message middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});


//express validator middleware
app.use(expressValidator());



//home route
app.get('/', (req, res) => {
    article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    })
});

//Route files

let articless = require('./routes/articles.js');
app.use('/articles', articless)

//start server
app.listen(5500, () => {
    console.log('server started on port 5500...')
})