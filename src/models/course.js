const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: String,
    code: String,
    lecturer: String,
    semester: Number,
});
module.exports = mongoose.model("Course", courseSchema, "course");