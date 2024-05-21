const mongoose = require("mongoose");
const Joi = require("Joi");

const studentSchema = mongoose.Schema({
  // _id: Schema .Types.UUID,
  name: { type: String },
  age: { type: Number },
  class: { type: String },
  favSubject: { type: String },
  email: { type: String },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher"},
});

const Student = mongoose.model("Student", studentSchema);

const validateStudent = (student) => {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(500).required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    class: Joi.string().required(),
    favSubject: Joi.string().required(),
    teacher: Joi.string().required(),
  });
  return schema.validate(student);
};

const validateUpdateStudent = (student) => {
  const schema = Joi.object({
    age: Joi.number().required(),
    class: Joi.string().required(),
    favSubject: Joi.string().required(),
    teacher: Joi.required(),
  });
  return schema.validate(student);
};

module.exports = { Student, validateStudent, validateUpdateStudent };
