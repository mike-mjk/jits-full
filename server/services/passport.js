const passport = require('passport');
const User = require('../models/user');
const config = require('../secret');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//local strategy
//the usernameFielid used to be set to email. it may not be necessary since
//it is now set to username
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function(username, password, done) {
	User.findOne({ username: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false); }

		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user);
		});
	});

});

//jwt strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	User.findById(payload.sub, function(err, user) {
		if (err) {return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);