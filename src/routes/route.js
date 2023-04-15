const express = require('express');
const router = express.Router();
const Students = require('../controllers/students');
const Lecturers = require('../controllers/lecturers');
const Courses = require('../controllers/courses');

/* Student endpoints */
router.get('/students', function(req, res) {
    Students.getAllStudents(req, res)
});
router.get('/student/:matricule', (req, res) => Students.getStudentById(req, res));
router.post('/student', (req, res) => Students.createStudent(req, res));
router.put('/student/:matricule', (req, res) => Students.updateStudent(req, res));
router.delete('/student/:matricule', (req, res) => Students.deleteStudent(req, res));

/* Lecturer endpoints */
router.get('/lecturers', (req, res) => Lecturers.getAllLecturers(req, res));
router.get('/lecturer/:matricule', (req, res) => Lecturers.getLecturerById(req, res));
router.post('/lecturer', (req, res) => Lecturers.createLecturer(req, res));
router.put('/lecturer/:matricule', (req, res) => Lecturers.updateLecturer(req, res));
router.delete('/lecturer/:matricule', (req, res) => Lecturers.deleteLecturer(req, res));

/* Course endpoints */
router.get('/courses', (req, res) => Courses.getAllCourses(req, res));
router.get('/course/:code', (req, res) => Courses.getCourseById(req, res));
router.post('/course', (req, res) => Courses.createCourse(req, res));
router.put('/course/:code', (req, res) => Courses.updateCourse(req, res));
router.delete('/course/:code', (req, res) => Courses.deleteCourse(req, res));

module.exports = router;