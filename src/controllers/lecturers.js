const passport = require("passport");
const Lecturer = require("../models/lecturer");

exports.getAllLecturers = async(req, res) => {
    Lecturer.find()
        .then(lecturer => {
            res.status(200).json(lecturer);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.registerLecturer = (req, res) => {
    const lecturer = new Lecturer();
    lecturer.name = req.body.name;
    lecturer.matricule = req.body.matricule;
    lecturer.email = req.body.email;
    lecturer.faculty = req.body.faculty;
    lecturer.fingerPrints = req.body.fingerPrints;
    lecturer.setPassword(req.body.password);
    lecturer.save()
        .then(() => {
            res.status(200).json({ message: "successfully registered Lecturer" });
        })
        .catch(err => {
            res.status(404).json({ error: err.message });
        });
};

exports.login = async(req, res) => {
    if (!req.body.matricule || !req.body.password) {
        return res.status(400).json({ "message": "All fields are required" });
    }
    passport.authenticate('authLecturer', (err, lecturer, info) => {
        let token;
        if (err) {
            return res.status(404).json(err);
        }
        if (lecturer) {
            token = lecturer.generateJwt();
            res.status(200).json({ "token": token, "message": "success" });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

exports.getLecturer = (req, res) => {
    Lecturer.findOne({ matricule: req.params.matricule })
        .then(lecturer => {
            if (!lecturer) {
                return res.status(404).json({ "message": "lecturer not found" });
            }
            res.status(200).json(lecturer);
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.updateLecturer = (req, res) => {
    if (!req.params.matricule) {
        return res.status(404).json({ "message": "Not found, lecturer matricule is required" });
    }
    Lecturer.findOne({ matricule: req.params.matricule })
        .select('-courses -salt -hash')
        .then(lecturer => {
            if (!lecturer) {
                return res.status(404).json({ "message": "lecturer not found" });
            }
            lecturer.name = req.body.name;
            lecturer.matricule = req.body.matricule;
            lecturer.email = req.body.email;
            lecturer.faculty = req.body.faculty;
            lecturer.fingerPrints = req.body.fingerPrints;
            lecturer.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully updated lecturer" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.deleteLecturer = (req, res) => {
    if (!req.body.matricule) {
        return res.status(404).json({ "message": "Not found, lecturer matricule is required" });
    }
    Lecturer.findOneAndRemove({ matricule: req.body.matricule })
        .then(lecturer => {
            if (!lecturer) {
                return res.status(404).json({ "message": "lecturer not found" });
            }
            res.status(204).json({ "message": "Lecturer successfully deleted" });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.registerCourses = (req, res) => {
    Lecturer.findOne({ matricule: req.params.matricule })
        .select('courses')
        .then(lecturer => {
            if (!lecturer) {
                return res.status(404).json({ "message": "lecturer not found" });
            }
            lecturer.courses = req.body.courses;
            lecturer.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully registered courses" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};