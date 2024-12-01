import { registerStudent, loginStudent, submitAnswer } from '../services/studentService.js';

export const register = async (req, res) => {
  const { enrollmentId, phone, name, password } = req.body;

  try {
    await registerStudent(enrollmentId, phone, name, password);
    return res.status(200).json({ message: 'Password set successfully. Please log in now.' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { enrollmentId, password } = req.body;

  try {
    const { student, token } = await loginStudent(enrollmentId, password);
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const submit = async (req, res) => {
  const { studentId, questionId, answer } = req.body;

  try {
    const response = await submitAnswer(studentId, questionId, answer);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

