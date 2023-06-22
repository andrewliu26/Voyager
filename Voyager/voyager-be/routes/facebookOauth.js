const express = require('express');
const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../config/facebookConfig');

const router = express.Router();

passport.use(new FaceBookStrategy({
    clientID: facebookConfig.facebookclientID,
    clientSecret: facebookConfig.facebookclientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, done) => {
    //Handle user authentication or registration logic here
}));

router.use(passport.initialize());

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    })
);

router.get('/success', (req, res) => {
    res.send('Authentication successful');
});

router.get('/failure', (req, res) => {
    res.send('Authentication failed!');
});

module.exports = router;