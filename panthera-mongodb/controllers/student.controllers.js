const { Student } = require("../models/student.model");

function basePath(req, res) {
  try {
    res.status(201).json({
      message: " welcome to our platform",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when creating student",
    });
  }
}

function notFound(req, res) {
  try {
    res.status(404).json({
      message: "page not found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error when creating student",
    });
  }
}

async function createStudent(req, res) {
  try {
    let studentExist = await Student.findOne({ name: req.body.name });
    if (studentExist) {
      return res.status(400).json({
        message: `This student ${req.body.name} already exist.`,
      });
    }

    let student = new Student(req.body);
    await student.save();
    res.status(201).json({
      message: " student created successfully",
      data: {
        _id: student.id,
        name: student.name,
        email: student.email,
        teacher: student.teacher.ref,
        age: student.age,
        favSubject: student.favSubject,
        class: student.class,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error when creating student",
    });
  }
}

const fetchAllStudents = async (req, res) => {
  try {
    let students = await Student.find({}).populate('teacher');
    res.status(201).json({
      message: " successful",
      data: students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching Students",
    });
  }
};

async function findById(req, res) {
  try {
    let student = await Student.findById(req.params.studentId).populate('teacher')
    if (!student) {
      return res.status(404).json({message: "this student does not exists"});
    }
    res.status(201).json({
      message: " student found",
      data: student,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "server Error",
    });
  }
}

async function updateStudent(req, res) {
  try {
    let id = req.params.Id;
    let studentExist = await Student.findById(id);
    if (!studentExist) {
      return res.status(400).json({
        message: `This student does not exist.`,
      });
    }
    
    let student = await Student.findByIdAndUpdate(id, req.body, {new: true});
    await student.save();
    res.status(201).json({
      message: " student updated",
      data: student,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "server Error",
    });
  }
}

async function deleteStudent(req, res) {
  try {
    let id = req.params.Id;
    let studentExist = await Student.findById(id);
    if (!studentExist) {
      return res.status(400).json({
        message: `This student cannot be deleted.`,
      });
    }
    
    let student = await Student.findByIdAndDelete(id);
    res.status(201).json({
      message: " student deleted",
      data: student,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server Error",
    });
  }
}

module.exports = {
  createStudent,
  basePath,
  notFound,
  fetchAllStudents,
  findById,
  updateStudent,
  deleteStudent
};
