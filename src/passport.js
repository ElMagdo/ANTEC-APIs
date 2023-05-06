const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require("./models/student");
const Lecturer = require('./models/lecturer');
const Admin = require('./models/admin');
const Device = require('./models/device');


/* Student Authentication */
passport.use("authStudent", new LocalStrategy({
    usernameField: 'matricule'
}, (username, password, done) => {
    Student.findOne({ matricule: username })
        .then(student => {
            if (!student) {
                return done(null, false, { message: 'Incorrect matricule.' });
            }
            if (!student.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, student);
        })
        .catch(err => { return done(err); });
}));

/* Lecturer Authentication */
passport.use("authLecturer", new LocalStrategy({
    usernameField: 'matricule'
}, (username, password, done) => {
    Lecturer.findOne({ matricule: username })
        .then(lecturer => {
            if (!lecturer) {
                return done(null, false, { message: 'Incorrect matricule.' });
            }
            if (!lecturer.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, lecturer);
        })
        .catch(err => { return done(err); });
}));

/* Admin Authentication */
passport.use("authAdmin", new LocalStrategy({
    usernameField: 'email'
}, (username, password, done) => {
    Admin.findOne({ email: username })
        .then(admin => {
            if (!admin) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!admin.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, admin);
        })
        .catch(err => { return done(err); });
}));

/* Device Authentication */
passport.use("authDevice", new LocalStrategy((username, password, done) => {
    Device.findOne({ name: username })
        .then(device => {
            if (!device) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!device.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, device);
        })
        .catch(err => { return done(err); });
}));