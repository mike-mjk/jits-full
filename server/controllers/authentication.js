const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../secret');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, (process.env.NODE_ENV === 'production' ? process.env.JWTSECRET : config.secret);
}

exports.signin = function(req, res, next) {
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
	const username = req.body.username;
	const password = req.body.password;
	const displayName = req.body.displayName;

	if (!username || !password) {
		return res.status(422).send({ error: 'There was an error with your log in attempt'});
	}

	User.findOne({ username: username }, function(err, existingUser) {
		if (err) { return next(err); }

		if (existingUser) {
			return res.status(422).send({ error: 'An account already exists with the username you provided' });
		}

		const user = new User({
			username: username,
			password: password,
			displayName: displayName,
			likedVideos: { 'a-6jC4UofMw': 
      { 
        id: 'a-6jC4UofMw',
        title: '10p SD 1',
        channelTitle: 'Michael Kostolnik',
        thumbnail: 'https://i.ytimg.com/vi/a-6jC4UofMw/mqdefault.jpg',
        description: '',
        addedBy: 'Other Mike',
        likes: 16,
        category: 'Competition',
        __v: 0,
        tags: [] }}
		});

		user.save(function(err) {
			if (err) { return next(err); }

			res.json({ token: tokenForUser(user) });
		});
	});
}