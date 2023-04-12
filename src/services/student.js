const studentModel = require("../models/student");

exports.getAllStudents = async() => {
    return await studentModel.find();
};

exports.createStudent = async(student) => {
    return await studentModel.create(student);
};
exports.getStudentById = async(id) => {
    return await studentModel.findById(id);
};

exports.updateStudent = async(id, student) => {
    return await studentModel.findByIdAndUpdate(id, student);
};

exports.deleteStudent = async(id) => {
    return await studentModel.findByIdAndDelete(id);
};