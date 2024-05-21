const express = require("express");
const server = express();
const mongoose = require("mongoose");
const {
  createStudent,
  basePath,
  notFound,
  fetchAllStudents,
  findById,
  updateStudent,
  deleteStudent,
} = require("./controllers/student.controllers");
const {
  createTeacher,
  fetchAllTeachers,
  fetchTeacherById,
  updateTeacher,
  deleteTeacher,
} = require("./controllers/teacher.controller");
let port = 2555;

server.use(express.json());

server.use(
  express.urlencoded({
    extended: true,
  })
);

server.post("/student", createStudent);

server.get("/student", fetchAllStudents);

server.get("/student/:studentId", findById);

server.put("/student/:Id", updateStudent);

server.delete("/student/:Id", deleteStudent);

server.post("/teacher", createTeacher);

server.get("/teachers", fetchAllTeachers);

server.get("/teacher/:teacherId", fetchTeacherById);

server.put("/teacher/:Id", updateTeacher);

server.delete("/teacher/:teacherId", deleteTeacher);

server.get("/", basePath);

server.all("*", notFound);

server.listen(port, async () => {
  try {
    console.log("server connected");
    await mongoose.connect("mongodb://127.0.0.1:27017/apple-collections");
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
});
