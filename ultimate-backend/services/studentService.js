import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from '../models/StudentSchema.js';


export const registerStudent = async (enrollmentId, phone, name, password) => {
  const student = await Student.findOne({ $or: [{ enrollmentId }, { phone }, { name }] });
  if (!student) {
    throw new Error('No matching records found');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  student.password = password;
  await student.save();

  return student;
};

export const loginStudent = async (enrollmentId, password) => {
  const student = await Student.findOne({ enrollmentId });
  if (!student) {
    throw new Error('Invalid enrollment ID');
  }

  const isMatch = await student.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ studentId: student._id }, 'secretKey', { expiresIn: '1h' });

  return { student, token };
};


export const submitAnswer = async (enrollmentId, questionId, answer) => {
  
  return { message: 'Question submitted successfully' };
};
