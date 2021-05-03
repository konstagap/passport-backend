const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/UserModel');

module.exports = new FacebookStrategy(
	{
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: '/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'picture.type(large)']
	},
	function (request, accessToken, refreshToken, profile, done) {
		User.findOne({ facebookId: profile.id }).then((currentUser) => {
			if (currentUser) {
				//if we already have a record with the given profile ID
				done(null, currentUser);
			} else {
				//if not, create a new user
				new User({
					oauthid: profile.id,
					provider: profile.provider,
					username: profile.displayName,
					picture: profile.photos ? profile.photos[0].value : '',
					admin: true
				})
					.save()
					.then((newUser) => {
						done(null, newUser);
					});
			}
		});
	}
);
