const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
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
app.get('/article/:id', (req, res) => {
    article.findById(req.params.id, (err, data) => {
        res.render('article', {
            data: data
        });

    });
})

//add Route 
app.get('/articles/add', (req, res) => {
    res.render('add', {
        title: 'Add articles'
    });
});


//add submit POST Route

app.post('/articles/add', (req, res) => {
    let arti = new article();
    arti.title = req.body.title;
    arti.author = req.body.author;
    arti.body = req.body.body;

    arti.save((err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
})

//start server
app.listen(5500, () => {
    console.log('server started on port 5500...')
})