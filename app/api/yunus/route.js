import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!global.mongoose) {
  global.mongoose = mongoose.connect(MONGO_URI);
}

const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default async function handler(req, res) {
  await global.mongoose;

  if (req.method === "GET") {
    const students = await Student.find();
    res.status(200).json(students);
  }

  if (req.method === "POST") {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  }
}
