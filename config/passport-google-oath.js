const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/UserModel');

module.exports = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL:
			'https://express-passport-api.herokuapp.com/auth/google/callback',
		passReqToCallback: true
	},
	function (request, accessToken, refreshToken, profile, done) {
		User.findOne({ oauthid: profile.id }).then((currentUser) => {
			if (currentUser) {
				//if we already have a record with the given profile ID
				done(null, currentUser);
			} else {
				//if not, create a new user
				new User({
					oauthid: profile.id,
					provider: profile.provider,
					username: `${profile.name.givenName} ${profile.name.familyName} `,
					picture: profile.picture,
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
