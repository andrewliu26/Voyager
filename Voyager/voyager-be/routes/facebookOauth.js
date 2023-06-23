const express = require('express');
const passport = require('passport');
const FaceBookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../config/facebookConfig');
const { User, findOne, save } = require('../files/fbUser');
const mongoose = require('mongoose');


const router = express.Router();

mongoose.connect('mongodb://127.0.0.1/fb_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });



passport.use(new FaceBookStrategy({
    clientID: facebookConfig.facebookClientID,
    clientSecret: facebookConfig.facebookclientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}, (accessToken, refreshToken, profile, done) => {
    //Handle user authentication or registration logic
    //check if user is already registered
    User.findOne({facebookId: profile.id}, (err, user) => {
        if(err) {
            return done(err);
        }

        if(user) {
            //user is registered
            return done(null, user);
        }

        //user is not registered, create new user
        const newUser = new User({
            facebookId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        });

        newUser.save((err) => {
            if(err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
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