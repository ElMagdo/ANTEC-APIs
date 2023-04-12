const express = require('express');
const router = express.Router();
const Students = require('../controllers/students');
const Lecturers = require('../controllers/lecturers');
const Courses = require('../controllers/courses');

/* Student endpoints */
router.get('/students', Students.getAllStudents);
router.get('/student/:matricule', Students.getStudentById);
router.post('/student', Students.createStudent);
router.update('/student/:matricule', Students.updateStudent);
router.delete('/student/:matricule', Students.deleteStudent);

/* Lecturer endpoints */
router.get('/lecturers', Lecturers.getAllLecturers);
router.get('/lecturer/:matricule', Lecturers.getLecturerById);
router.post('/lecturer', Lecturers.createLecturer);
router.update('/lecturer/:matricule', Lecturers.updateLecturer);
router.delete('/lecturer/:matricule', Lecturers.deleteLecturer);

/* Course endpoints */
router.get('/courses', Courses.getAllCourses);
router.get('/course/:code', Courses.getCourseById);
router.post('/course', Courses.addCourse);
router.update('/course/:code', Courses.updateCourse);
router.delete('/course/:code', Courses.deleteCourse);

module.exports = router;