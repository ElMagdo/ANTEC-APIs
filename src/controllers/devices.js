const passport = require("passport");
const Device = require("../models/device");

exports.getAllDevices = async(req, res) => {
    Device.find()
        .then(devices => {
            res.status(200).json(devices);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.getDevice = (req, res) => {
    Device.findOne({ name: req.params.name })
        .then(device => {
            if (!device) {
                return res.status(404).json({ "message": "device not found" });
            }
            res.status(200).json(device);
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.registerDevice = (req, res) => {
    const device = new Device();
    device.name = req.body.name;
    device.setPassword(req.body.password);
    device.save()
        .then(() => {
            res.status(200).json({ message: "successfully registered Device" });
        })
        .catch(err => {
            res.status(404).json({ error: err.message });
        });
};

exports.deviceLogin = async(req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).json({ "message": "All fields are required" });
    }
    passport.authenticate('authDevice', (err, device, info) => {
        let token;
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        if (device) {
            token = device.generateJwt();
            res.status(200).json({ "token": token, "message": "success" });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

exports.updateDevice = (req, res) => {
    if (!req.params.name) {
        return res.status(404).json({ "message": "Not found, device name is required" });
    }
    Device.findOne({ name: req.params.name })
        .select('-salt -hash')
        .then(device => {
            if (!device) {
                return res.status(404).json({ "message": "device not found" });
            }
            device.name = req.body.name;
            device.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully updated device" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.deleteDevice = (req, res) => {
    if (!req.body.name) {
        return res.status(404).json({ "message": "Not found, device name is required" });
    }
    Device.findOneAndRemove({ name: req.body.name })
        .then(device => {
            if (!device) {
                return res.status(404).json({ "message": "device not found" });
            }
            res.status(204).json({ "message": "Device successfully deleted" });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};