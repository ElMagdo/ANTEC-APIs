const express = require('express');
const router = express.Router();
const Students = require('../controllers/students');
const Lecturers = require('../controllers/lecturers');
const Courses = require('../controllers/courses');
const Admins = require('../controllers/admins');
const Attendance = require('../controllers/attendance');
const Devices = require('../controllers/devices');

/* Admin endpoints */
router.get('/admins', (req, res) => Admins.getAllAdmins(req, res));
router.get('/admin/:email', (req, res) => Admins.getAdmin(req, res));
router.post('/admin', (req, res) => Admins.registerAdmin(req, res));
router.post('/admin/login', (req, res) => Admins.adminLogin(req, res));
router.put('/admin/:email', (req, res) => Admins.updateAdmin(req, res));
router.post('/admin/delete', (req, res) => Admins.deleteAdmin(req, res));

/* Device endpoints */
router.get('/devices', (req, res) => Devices.getAllDevices(req, res));
router.get('/device/:name', (req, res) => Devices.getDevice(req, res));
router.post('/device', (req, res) => Devices.registerDevice(req, res));
router.post('/device/login', (req, res) => Devices.deviceLogin(req, res));
router.put('/device/:name', (req, res) => Devices.updateDevice(req, res));
router.post('/device/delete', (req, res) => Devices.deleteDevice(req, res));

/* Student endpoints */
router.get('/students', (req, res) => Students.getAllStudents(req, res));
router.get('/student/:matricule', (req, res) => Students.getStudent(req, res));
router.post('/student', (req, res) => Students.registerStudent(req, res));
router.post('/student/login', (req, res) => Students.login(req, res));
router.put('/student/:matricule', (req, res) => Students.updateStudent(req, res));
router.post('/student/delete', (req, res) => Students.deleteStudent(req, res));
router.post('/student/:matricule/courses', (req, res) => Students.registerCourses(req, res));

/* Lecturer endpoints */
router.get('/lecturers', (req, res) => Lecturers.getAllLecturers(req, res));
router.get('/lecturer/:matricule', (req, res) => Lecturers.getLecturer(req, res));
router.post('/lecturer', (req, res) => Lecturers.registerLecturer(req, res));
router.post('/lecturer/login', (req, res) => Lecturers.login(req, res));
router.put('/lecturer/:matricule', (req, res) => Lecturers.updateLecturer(req, res));
router.post('/lecturer/delete', (req, res) => Lecturers.deleteLecturer(req, res));
router.post('/lecturer/:matricule/courses', (req, res) => Lecturers.registerCourses(req, res));

/* Course endpoints */
router.get('/courses', (req, res) => Courses.getAllCourses(req, res));
router.get('/course/:code', (req, res) => Courses.getCourse(req, res));
router.post('/course', (req, res) => Courses.registerCourse(req, res));
router.put('/course/:code', (req, res) => Courses.updateCourse(req, res));
router.post('/course/delete', (req, res) => Courses.deleteCourse(req, res));

/* Attendance endpoints */
router.get('/attendance', (req, res) => Attendance.getAllAttendance(req, res));
router.get('/attendance/:code', (req, res) => Attendance.getAttendance(req, res));
router.post('/attendance', (req, res) => Attendance.addAttendance(req, res));
router.post('/attendance/delete', (req, res) => Attendance.deleteAttendance(req, res));

module.exports = router;