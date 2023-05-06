const passport = require("passport");
const Student = require("../models/student");

exports.getAllStudents = async(req, res) => {
    Student.find()
        .then(student => {
            res.status(200).json(student);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.registerStudent = (req, res) => {
    const student = new Student();
    student.name = req.body.name;
    student.matricule = req.body.matricule;
    student.email = req.body.email;
    student.faculty = req.body.faculty;
    student.fingerPrints = req.body.fingerPrints;
    student.setPassword(req.body.password);
    student.save()
        .then(() => {
            res.status(200).json({ message: "successfully registered Student" });
        })
        .catch(err => {
            res.status(404).json({ error: err.message });
        });
};

exports.login = async(req, res) => {
    if (!req.body.matricule || !req.body.password) {
        return res.status(400).json({ "message": "All fields are required" });
    }
    passport.authenticate('authStudent', (err, student, info) => {
        let token;
        if (err) {
            return res.status(404).json(err);
        }
        if (student) {
            token = student.generateJwt();
            res.status(200).json({ "token": token, "message": "success" });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

exports.getStudent = (req, res) => {
    Student.findOne({ matricule: req.params.matricule })
        .then(student => {
            if (!student) {
                return res.status(404).json({ "message": "student not found" });
            }
            res.status(200).json(student);
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.updateStudent = (req, res) => {
    if (!req.params.matricule) {
        return res.status(404).json({ "message": "Not found, student matricule is required" });
    }
    Student.findOne({ matricule: req.params.matricule })
        .select('-courses -salt -hash')
        .then(student => {
            if (!student) {
                return res.status(404).json({ "message": "student not found" });
            }
            student.name = req.body.name;
            student.matricule = req.body.matricule;
            student.email = req.body.email;
            student.faculty = req.body.faculty;
            student.fingerPrints = req.body.fingerPrints;
            student.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully updated student" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.deleteStudent = (req, res) => {
    if (!req.body.matricule) {
        return res.status(404).json({ "message": "Not found, student matricule is required" });
    }
    Student.findOneAndRemove({ matricule: req.body.matricule })
        .then(student => {
            if (!student) {
                return res.status(404).json({ "message": "student not found" });
            }
            res.status(204).json({ "message": "Student successfully deleted" });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.registerCourses = (req, res) => {
    Student.findOne({ matricule: req.params.matricule })
        .select('courses')
        .then(student => {
            if (!student) {
                return res.status(404).json({ "message": "student not found" });
            }
            student.courses = req.body.courses;
            student.save()
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