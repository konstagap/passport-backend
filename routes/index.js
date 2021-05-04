const router = require('express').Router();
const passport = require('passport');
const { isAuth, sendUser, createUser } = require('../config/authMiddleware');

require('dotenv').config();

// facebook OAUTHROUTES
router.get('/api/auth/facebook', passport.authenticate('facebook'));
router.get(
	'/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: process.env.CLIENT_BASE_URL,
		failureRedirect: `${process.env.CLIENT_BASE_URL}/login`
	})
);
// ------GOOGLE OAUTH ROUTES
router.get(
	'/api/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.CLIENT_BASE_URL,
		failureRedirect: `${process.env.CLIENT_BASE_URL}/login`
	})
);

// SIGN UP ROUTE WITH AUTHOMATIC LOG IN VIA PASSPORT LOCAL STRATEGY
router.post(
	'/api/signup',
	createUser,
	passport.authenticate('local'),
	sendUser
);

// LOG IN ROUTE WITH PASSPORT LOCAL STRATEGY
router.post('/api/login', passport.authenticate('local'), sendUser);

// ROUTE ROUTE, checking cookies, if req.user populated via passport.desirializer then send user
router.get('/api/', sendUser);

// LOG OUT USER, DELETES SESSION AND COOKIES
router.get('/api/logout', isAuth, (req, res) => {
	req.logout();
	res.end();
});
// Just for test
router.get('/', (req, res) => {
	res.send('Helllo WOlrd');
});

module.exports = router;
