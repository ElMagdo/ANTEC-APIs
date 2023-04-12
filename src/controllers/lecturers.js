const lecturerService = require("../services/lecturer");

exports.getAllLecturers = async(req, res) => {
    try {
        const lecturers = await lecturerService.getAllLecturers();
        res.json({ data: lecturers, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createLecturer = async(req, res) => {
    try {
        const lecturer = await lecturerService.createLecturer(req.body);
        res.json({ data: lecturer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLecturerById = async(req, res) => {
    try {
        const lecturer = await lecturerService.getLecturerById(req.params.matricule);
        res.json({ data: lecturer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateLecturer = async(req, res) => {
    try {
        const lecturer = await lecturerService.updateLecturer(req.params.matricule, req.body);
        res.json({ data: lecturer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteLecturer = async(req, res) => {
    try {
        const lecturer = await lecturerService.deleteLecturer(req.params.matricule);
        res.json({ data: lecturer, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};