const Course = require("../models/course");

exports.getAllCourses = async(req, res) => {
    Course.find()
        .then(course => {
            res.status(200).json(course);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.registerCourse = (req, res) => {
    const course = new Course();
    course.name = req.body.name;
    course.code = req.body.code;
    course.faculty = req.body.faculty;
    course.save()
        .then(() => {
            res.status(200).json({ message: "successfully registered Course" });
        })
        .catch(err => {
            res.status(404).json({ error: err.message });
        });
};

exports.getCourse = (req, res) => {
    Course.findOne({ code: req.params.code })
        .then(course => {
            if (!course) {
                return res.status(404).json({ "message": "course not found" });
            }
            res.status(200).json(course);
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.updateCourse = (req, res) => {
    if (!req.params.code) {
        return res.status(404).json({ "message": "Not found, course code is required" });
    }
    Course.findOne({ code: req.params.code })
        .then(course => {
            if (!course) {
                return res.status(404).json({ "message": "course not found" });
            }
            course.name = req.body.name;
            course.code = req.body.code;
            course.faculty = req.body.faculty;
            course.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully updated course" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.deleteCourse = (req, res) => {
    if (!req.body.code) {
        return res.status(404).json({ "message": "Not found, course code is required" });
    }
    Course.findOneAndRemove({ code: req.body.code })
        .then(course => {
            if (!course) {
                return res.status(404).json({ "message": "course not found" });
            }
            res.status(204).json({ "message": "Course successfully deleted" });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};