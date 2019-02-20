const express = require('express');
const router = express.Router();


//bring in the models
let article = require('../models/article');






//Load edit form
router.get('/edit/:id', (req, res) => {
    article.findById(req.params.id, (err, data) => {
        res.render('edit_article', {
            title: 'Edit page',
            data: data
        });

    });
})

//add Route 
router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add articles'
    });
});


//add submit POST Route

router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();


    // Get Errors

    let errors = req.validationErrors();

    if (errors) {
        res.render('add', {
            errors: errors,
            title: 'Add Article'
        })
    } else {
        let arti = new article();
        arti.title = req.body.title;
        arti.author = req.body.author;
        arti.body = req.body.body;

        arti.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        })
    }


})


//Update article
router.post('/edit/:id', (req, res) => {
    let arti = {};
    arti.title = req.body.title;
    arti.author = req.body.author;
    arti.body = req.body.body;
    let query = {
        _id: req.params.id
    }

    article.update(query, arti, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    })
})
//Get Single Article
router.get('/:id', (req, res) => {
    article.findById(req.params.id, (err, data) => {
        res.render('article', {
            data: data
        });

    });
})
//Delete Article
router.delete('/:id', (req, res) => {
    let query = {
        _id: req.params.id
    }
    article.remove(query, (err) => {
        if (err) {
            console.log(err);
        }
        res.send('Success');
    })
})
module.exports = router;