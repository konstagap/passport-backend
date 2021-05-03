const session = require('express-session');
const connection = require('../config/database');
const MongoStore = require('connect-mongo')(session);

const sessionStore = new MongoStore({
	mongooseConnection: connection,
	collection: 'sessions'
});

module.exports = session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
	store: sessionStore,
	name: 'testAuth',
	cookie: {
		sameSite: 'none',
		secure: true,
		maxAge: 1000 * 60 * 60 * 24
		// Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
	}
});
