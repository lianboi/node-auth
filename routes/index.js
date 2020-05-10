var express = require('express');
var router = express.Router();
const data = require('../data');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

const facebook={
    clientId:"",
    secret:"",
    callback:"http://localhost:3000/callback/facebook"
}

passport.use(new LocalStrategy(function(username, password, done) {
    var findUser={}

    // Assignment 2
    // verify User from User Mongoose Model and If user exists then MArked login and Show name in Logged in state Else Error USer Not found

    data.forEach(function(user){
        if(user.username==username && user.password==password){
            findUser=user
        }
    })
    if(Object.keys(findUser).length){
        return done(null, findUser);
    }else{
        console.log(">error")
        return done({status:"400", message: "Invalid credentials" });
    }
}))

passport.serializeUser(function (user, cb) {  
    cb(null, { username: user.username, name: user.name });
});

passport.deserializeUser(function (user, cb) {
  console.log('.....deserializing user....', user);
    cb(null, user);
});
//
// passport.use(new FacebookStrategy({
//         clientID: facebook.clientId,
//         clientSecret: facebook.secret,
//         callbackURL: facebook.callback,
//         enableProof: true,
//         profileFields: ['id', 'emails', 'name'] //This
//     },
// function (accessToken, refreshToken, profile, done) {
//     //Save user in DB
//         return done(null,profile)
//     }
// ));

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status = 403;
  return res.send("Not authenticated!");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  let user = { username: req.user.username, name: req.user.name };
  res.send(user);
  // res.end("??????????????");
});

router.post('/logout', isAuthenticated, function (req, res, next) {
  req.logout();
  res.send('successfully logout!');
});

router.get('/check-auth-status', isAuthenticated, function(req, res, next) {
  return res.end("Authenticated.");
})

router.get('/facebookLogin', passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    failureRedirect: '/',
    session: false
}))
router.get('/callback/facebook', passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false
}), function (req, res) {
    console.log(req.user,">>>>>>>>>>>>>")
    //Save token in cookie and mareked login
    res.redirect("/")
})

module.exports = router;
