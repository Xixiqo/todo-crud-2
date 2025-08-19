import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("todo"); // ganti sesuai nama db kamu
    const data = await db.collection("tasks").find().toArray();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
