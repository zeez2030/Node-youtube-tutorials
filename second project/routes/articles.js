const express = require('express');
const router = express.Router();


//bring in the models
let article = require('../models/article');
let User = require('../models/user');






//Load edit form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    article.findById(req.params.id, (err, data) => {
        if (data.author != req.user._id) {
            req.flash('danger', 'not Authorized');
            res.redirect('/');
            return
        }
        User.findById(data.author, (err, user) => {
            if (err) throw error;
            else {
                res.render('edit_article', {
                    title: 'Edit page',
                    data: data,
                    user: user.name
                });

            }
        })

    });
})

//add Route 
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('add', {
        title: 'Add articles'
    });
});


//add submit POST Route

router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();

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
        arti.author = req.user._id;
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
    arti.author = req.user._id;
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
        User.findById(data.author, (err, user) => {
            if (err) throw err;
            res.render('article', {
                data: data,
                author: user.name
            });
        })


    });
})
//Delete Article
router.delete('/:id', (req, res) => {
    if (!req.user) {
        res.status(500).send();
    }

    let query = {
        _id: req.params.id
    }
    article.findById(req.params.id, (err, a) => {
        if (a.author != req.user._id) {
            res.status(500).send();
        } else {
            article.remove(query, (err) => {
                if (err) {
                    console.log(err);
                }
                res.send('Success');
            })
        }
    })


})


//access Control

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}
module.exports = router;