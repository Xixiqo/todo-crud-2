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

// GET method
export async function GET(req) {
  await global.mongoose;
  const students = await Student.find();
  return new Response(JSON.stringify(students), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST method
export async function POST(req) {
  await global.mongoose;
  const body = await req.json();
  const student = new Student(body);
  await student.save();
  return new Response(JSON.stringify(student), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
