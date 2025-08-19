import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("todo-crud-2"); // ganti sesuai nama DB kamu
    const students = await db.collection("students").find().toArray();

    return NextResponse.json(students);
  } catch (err) {
    console.error("❌ Error GET:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
