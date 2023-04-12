class Student {
    constructor(student) {
        this.name = student.name;
        this.matricule = student.matricule;
        this.password = student.password;
        this.fingerPrint = student.fingerPrint;
        this.courses = student.courses;
        this.attendance = student.attendance;
    }
}

class Lecturer {
    constructor(lecturer) {
        this.name = lecturer.name;
        this.matricule = lecturer.matricule;
        this.password = lecturer.password;
        this.fingerPrint = lecturer.fingerPrint;
        this.courses = lecturer.courses;
    }
}

class Course {
    constructor(course) {
        this.name = course.name;
        this.code = course.code;
    }
}
module.exports = { Student, Lecturer, Course }