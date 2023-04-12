const lecturerModel = require("../models/lecturer");

exports.getAllLecturers = async() => {
    return await lecturerModel.find();
};

exports.createLecturer = async(lecturer) => {
    return await lecturerModel.create(lecturer);
};
exports.getLecturerById = async(id) => {
    return await lecturerModel.findById(id);
};

exports.updateLecturer = async(id, lecturer) => {
    return await lecturerModel.findByIdAndUpdate(id, lecturer);
};

exports.deleteLecturer = async(id) => {
    return await lecturerModel.findByIdAndDelete(id);
};