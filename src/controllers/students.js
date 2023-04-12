const studentService = require("../services/student");

exports.getAllStudents = async(req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.json({ data: students, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createStudent = async(req, res) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.json({ data: student, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudentById = async(req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.matricule);
        res.json({ data: student, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStudent = async(req, res) => {
    try {
        const student = await studentService.updateStudent(req.params.matricule, req.body);
        res.json({ data: student, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteStudent = async(req, res) => {
    try {
        const student = await studentService.deleteStudent(req.params.matricule);
        res.json({ data: student, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};