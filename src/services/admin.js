const adminModel = require("../models/admin");

exports.getAllAdmins = async() => {
    return await adminModel.find();
};

exports.createAdmin = async(admin) => {
    return await adminModel.create(admin);
};

exports.updateAdmin = async(id, admin) => {
    return await adminModel.findByIdAndUpdate(id, admin);
};

exports.deleteAdmin = async(id) => {
    return await adminModel.findByIdAndDelete(id);
};