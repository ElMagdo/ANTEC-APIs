const passport = require("passport");
const Admin = require("../models/admin");

exports.getAllAdmins = async(req, res) => {
    Admin.find()
        .then(admins => {
            res.status(200).json(admins);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};

exports.getAdmin = (req, res) => {
    Admin.findOne({ email: req.params.email })
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ "message": "admin not found" });
            }
            res.status(200).json(admin);
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.registerAdmin = (req, res) => {
    const admin = new Admin();
    admin.name = req.body.name;
    admin.email = req.body.email;
    admin.fingerPrints = req.body.fingerPrints;
    admin.setPassword(req.body.password);
    admin.save()
        .then(() => {
            res.status(200).json({ message: "successfully registered Admin" });
        })
        .catch(err => {
            res.status(404).json({ error: err.message });
        });
};

exports.adminLogin = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ "message": "All fields are required" });
    }
    passport.authenticate('authAdmin', (err, admin, info) => {
        let token;
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        if (admin) {
            token = admin.generateJwt();
            res.status(200).json({ token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
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
            res.status(200).json({ token });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

exports.updateAdmin = (req, res) => {
    if (!req.params.email) {
        return res.status(404).json({ "message": "Not found, admin email is required" });
    }
    Admin.findOne({ email: req.params.email })
        .select('-salt -hash')
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ "message": "admin not found" });
            }
            admin.name = req.body.name;
            admin.email = req.body.email;
            admin.fingerPrints = req.body.fingerPrints;
            admin.save()
                .then(() => {
                    res.status(200).json({ message: "Successfully updated admin" });
                })
                .catch(err => {
                    res.status(404).json({ error: err.message });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};

exports.deleteAdmin = (req, res) => {
    if (!req.body.email) {
        return res.status(404).json({ "message": "Not found, admin email is required" });
    }
    Admin.findOneAndRemove({ email: req.body.email })
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ "message": "admin not found" });
            }
            res.status(204).json({ "message": "Admin successfully deleted" });
        })
        .catch(err => {
            return res.status(404).json({ error: err.message });
        });
};