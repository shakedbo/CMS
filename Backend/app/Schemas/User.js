const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// We need a secret to sign and validate JWT's. This secret should be a random
// string that is remembered for your application; it's essentially the password to your JWT's.
const secret = require('../Config').secret;

/**
 * Constants
 */
const ITERATIONS = 10000;
const HASH_LENGTH = 512;


/**
 * Denote 4me, we never save discovered passwords in the DB, only their hashes
 */
var UserSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    email: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    hash: String,
    salt: String
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });


// Methods
/**
 * Setting user password
 */

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    // pbkdf2 algorithm is used to generate and validate hashes
    this.hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, HASH_LENGTH, 'sha512').toString('hex');
};

/**
 * 
 * @param {The given password from the user in order to check if he is authenticated} password 
 * @returns validate passwords - T/F
 */

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, HASH_LENGTH, 'sha512').toString('hex');
    return this.hash === hash;
};



/**
 * Now, we have everything that's needed to generate a JWT for a user.
 * For the token's payload, we'll be including three fields:
 * *) id which is the database id of the user
 * *) username which is the username of the user
 * *) exp which is a UNIX timestamp in seconds that determines when the token will expire.
 *                         We'll be setting the token expiration to 15 minutes.
 * 
 */

UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setMinutes(exp.getMinutes() + 15);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

/**
 * Lastly, we'll need a method on the user model to get the JSON representation of the user that
 * will be passed to the front-end during authentication. This JSON format should only be returned
 * to that specific user since it contains sensitive information like the JWT.
 * TL;DR - JSON representation of a user for authentication.
 */
UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT()
    };
};



mongoose.model('User', UserSchema);