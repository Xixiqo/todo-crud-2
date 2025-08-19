import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGO_URI = process.env.MONGO_URI;

// Fungsi untuk koneksi ke database
async function connectDb() {
  // Cek jika sudah ada koneksi yang aktif
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  // Jika belum, buat koneksi baru
  return mongoose.connect(MONGO_URI);
}

// Mendefinisikan Skema dan Model
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Mencegah model dibuat ulang setiap kali ada hot-reload di development
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

// Handler untuk method GET
export async function GET(request) {
  try {
    await connectDb(); // Pastikan database terhubung
    const students = await Student.find({}); // Ambil semua data student
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Handler untuk method POST
export async function POST(request) {
  try {
    await connectDb(); // Pastikan database terhubung
    const body = await request.json(); // Ambil data dari body request
    
    const student = new Student(body); // Buat instance student baru
    await student.save(); // Simpan ke database
    
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Failed to create student:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
