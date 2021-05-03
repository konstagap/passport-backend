const { genPassword } = require('../lib/passwordUtils');
const User = require('../models/UserModel');

module.exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send('You are not authorized to view this resource');
	}
};

module.exports.isAdmin = (req, res, next) => {
	if (req.isAuthenticated() && req.user.admin) {
		next();
	} else {
		res.status(401).send('You are not admin to view this resource');
	}
};
const serializeUserToFrontEnd = ({
	username,
	oauthid,
	id,
	picture,
	provider,
	admin
}) => ({ username, admin, id, picture, provider, oauthid });

module.exports.sendUser = (req, res) => {
	if (req.user) {
		const userToFrontEnd = serializeUserToFrontEnd(req.user);
		res.status(200).send(userToFrontEnd);
	} else {
		res.status(404).send('Sorry, cant find user');
	}
};

module.exports.createUser = (req, res, next) => {
	const saltHash = genPassword(req.body.password);

	const salt = saltHash.salt;
	const hash = saltHash.hash;

	const newUser = new User({
		username: req.body.email,
		hash: hash,
		salt: salt,
		admin: true
	});

	newUser
		.save()
		.then(() => {
			next();
		})
		.catch((err) => res.status(503).send(err));
};
