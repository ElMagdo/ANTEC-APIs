const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
    name: String,
    code: String,
    attendance: Number,
});

const studentSchema = new Schema({
    name: String,
    matricule: String,
    password: String,
    fingerPrints: String,
    courses: [Course],
});

module.exports = mongoose.model("Student", studentSchema, "students");