const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//bring in the User models
let User = require('../models/user');

//Register form

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);

    let err = req.validationErrors();
    if (err) {
        res.render('register', {
            errors: err
        })
    } else {
        let newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                }
                newUser.password = hash;
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in');
                        res.redirect('/users/login');
                    }
                })
            });
        })
    }
});

//login form
router.get('/login', (req, res) => {
    res.render('login');
})

//login process

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})


//logout

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;