const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const student = new Schema({
    matricule: String,
    value: Number
});

const attendanceSchema = new Schema({
    code: String,
    sheet: [student]
});

module.exports = mongoose.model("Attendance", attendanceSchema, "attendance");