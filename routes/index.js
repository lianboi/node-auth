var express = require('express');
var router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
	return done(null, username);
}))

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
 
passport.deserializeUser(function (user, cb) {
 
    cb(null, user);
 
});


const data = require('../data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
		res.end("??????????????");
});

// router.post('/login', function(req, res, next) {
// 	passport.authenticate('local', (err, result) => {
// 			console.log(err, result);
//         if (result) {
//             return res.status(200).send(result);
//         }
//         return res.status(401).send(err);
//     })(req, res, next);
// });


module.exports = router;
