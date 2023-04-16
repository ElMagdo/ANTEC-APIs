const courseService = require("../services/course");

exports.getAllCourses = async(req, res) => {
    try {
        const courses = await courseService.getAllCourses();
        res.status(200).json({ data: courses, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createCourse = async(req, res) => {
    try {
        const course = await courseService.createCourse(req.body);
        res.status(200).json({ data: course, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCourseById = async(req, res) => {
    try {
        const course = await courseService.getCourseById(req.params.code);
        res.status(200).json({ data: course, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCourse = async(req, res) => {
    try {
        const course = await courseService.updateCourse(req.params.code, req.body);
        res.status(200).json({ data: course, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCourse = async(req, res) => {
    try {
        const course = await courseService.deleteCourse(req.params.code);
        res.status(200).json({ data: course, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};