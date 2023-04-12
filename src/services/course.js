const courseModel = require("../models/course");

exports.getAllCourses = async() => {
    return await courseModel.find();
};

exports.createCourse = async(course) => {
    return await courseModel.create(course);
};
exports.getCourseById = async(id) => {
    return await courseModel.findById(id);
};

exports.updateCourse = async(id, course) => {
    return await courseModel.findByIdAndUpdate(id, course);
};

exports.deleteCourse = async(id) => {
    return await courseModel.findByIdAndDelete(id);
};