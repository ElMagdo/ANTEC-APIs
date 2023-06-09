const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const course = new Schema({
    name: String,
    code: String
});

const studentSchema = new Schema({
    name: String,
    matricule: String,
    email: String,
    faculty: String,
    salt: String,
    hash: String,
    fingerPrints: String,
    courses: [course]
});

studentSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

studentSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

studentSchema.methods.generateJwt = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        matricule: this.matricule,
        exp: parseInt(expiry.getTime() / 1000, 10),
    }, process.env.JWT_SECRET);
};

module.exports = mongoose.model("Student", studentSchema, "students");