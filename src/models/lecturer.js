const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    name: String,
    matricule: String,
    password: String,
    fingerPrints: String,
});

module.exports = mongoose.model("Lecturer", lecturerSchema, "lecturers");