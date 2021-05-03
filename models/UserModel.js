const mongoose = require('mongoose');

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
	provider: String,
	oauthid: String,
	picture: String,
	username: { type: String, required: true },
	hash: { type: String, default: '' },
	salt: { type: String, default: '' },
	admin: Boolean
});

const User = mongoose.model('User', UserSchema);

// Expose the model
module.exports = User;
