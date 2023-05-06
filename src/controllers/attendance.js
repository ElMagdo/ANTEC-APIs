const Attendance = require("../models/attendance");

exports.getAllAttendance = async(req, res) => {
    Attendance.find()
        .then(attendance => {
            res.status(200).json(attendance);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.getAttendance = (req, res) => {
    Attendance.findOne({ code: req.params.code })
        .then(attendance => {
            if (!attendance) {
                return res.status(404).json({ "message": "attendance not found" });
            }
            res.status(200).json(attendance);
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.addAttendance = (req, res) => {
    if (!req.body.code) {
        return res.status(404).json({ "message": "Not found, course code is required" });
    }
    Attendance.findOne({ code: req.body.code })
        .then(attendance => {
            if (!attendance) {
                const newAttendance = new Attendance();
                newAttendance.code = req.body.code;
                addAttendanceSheet(newAttendance, req.body.sheet);
                newAttendance.save()
                    .then(() => {
                        res.status(200).json({ message: "successfully added Attendance" });
                    })
                    .catch(err => {
                        res.status(404).json({ error: err.message });
                    });
            }
            attendance.code = req.body.code;
            updateAttendance(attendance, req.body.sheet);
            attendance.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully updated attendance" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

const updateAttendance = (att, sht) => {
    sht.forEach((s) => {
        att.sheet.forEach((i) => {
            if (i.matricule == s) {
                i.value += 1;
            }
        });
        att.sheet.push({
            matricule: s,
            value: 1
        });
    });
};

const addAttendanceSheet = (att, sht) => {
    sht.forEach((s) => {
        att.sheet.push({
            matricule: s,
            value: 1
        })
    })
}

exports.deleteAttendance = (req, res) => {
    if (!req.body.code) {
        return res.status(404).json({ "message": "Not found, course code is required" });
    }
    Attendance.findOneAndRemove({ code: req.body.code })
        .then(attendance => {
            if (!attendance) {
                return res.status(404).json({ "message": "attendance not found" });
            }
            res.status(204).json({ "message": "Attendance successfully deleted" });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
}