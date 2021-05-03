const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/UserModel');

const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
	usernameField: 'email',
	passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
	User.findOne({ username: username })
		.then((user) => {
			if (!user) {
				return done(null, false);
			}
			const isValid = validPassword(password, user.hash, user.salt);
			if (isValid) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		})
		.catch((err) => {
			done(err);
		});
};

module.exports = new LocalStrategy(customFields, verifyCallback);
