const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	username: { type: String, unique: true, lowercase: true },
	password: { type: String },
	displayName: { type: String },
	likedVideos: { type: Object, required: true }
});

userSchema.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if (err) {return next(err); }

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {return next(err); }

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
	console.log('this.password', this.password, 'candidatePassword', candidatePassword, 'from user.js');
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		console.log('err in bcrypt.compare user.js', err, 'isMatch: ', isMatch);
		if (err) { return callback(err); }

		callback(null, isMatch);
	});
}

const User = mongoose.model('User', userSchema);

module.exports = User;