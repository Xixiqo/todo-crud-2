import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("todo-crud");
    const todos = await db.collection("todos").find().toArray();

    return NextResponse.json({ success: true, data: todos });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
