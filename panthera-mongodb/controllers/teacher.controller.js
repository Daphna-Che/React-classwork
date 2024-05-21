const {Teacher} = require("../models/teacher.model");

async function createTeacher(req, res) {
    try {
        let teacherExist = await Teacher.findOne({ name: req.body.name });
        if (teacherExist) {
          return res.status(400).json({
            message: `This Teacher ${req.body.name} already exist.`,
          });
        }
    
        let teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json({
          message: " teacher created successfully",
          data: teacher,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error creating",
        });
      }
    }

    const fetchAllTeachers = async (req, res) => {
      try {
        let teachers = await Teacher.find({});
        res.status(201).json({
          message: " successful",
          data: teachers,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Error fetching teachers",
        });
      }
    };

    async function fetchTeacherById(req, res) {
      try {
        let teacher = await Teacher.findById(req.params.teacherId);
        if (!teacher) {
          return res.status(404).json({message: "this teacher does not exists"});
        } else {
          return res.status(201).json({
            message: " teacher found",
            data: teacher,
          });
        }
        
      } catch (error) {
        console.log(error)
        res.status(500).json({
          message: "Server Error",
        });
      }
    }


    async function updateTeacher(req, res) {
      try {
        let id = req.params.Id;
        let teacherExist = await Teacher.findById(id);
        if (!teacherExist) {
          return res.status(400).json({
            message: `This teacher does not exist.`,
          });
        }
        
        let teacher = await Teacher.findByIdAndUpdate(id, req.body, {new: true});
        // await teacher.save();
        res.status(201).json({
          message: " teacher updated",
          data: teacher,
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({
          message: error.message,
        });
      }
    }

    async function deleteTeacher(req, res) {
      try {
        let teacherId = req.params.teacherId;
        let teacher = await Teacher.findByIdAndDelete(teacherId);
        
          return res.status(201).json({
            message: `teacher deleted successfully.`,
            data: teacher,
          });
        } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
    

    module.exports = { createTeacher, fetchAllTeachers, fetchTeacherById, updateTeacher, deleteTeacher };
