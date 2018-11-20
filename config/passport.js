const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local', new LocalStrategy( function (username, password, done) {
	console.log("hello worlds");
	return done(null, { username });
}));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
 
passport.deserializeUser(function (id, cb) {
 
    cb(null, user);
 
});
