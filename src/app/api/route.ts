import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Student from "../../../models/Student";

export async function GET() {
  await connectDB();

  const students = await Student.find().sort({ createdAt: -1 });

 return NextResponse.json(students)
}




export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    if (
      !body.name ||
      !body.surname! ||
      !body.class ||
      body.grade === null ||
      body.studentId === null
    ) {
      return NextResponse.json(
        { error: "missing fields required" },
        { status: 400 },
      );
    }
    const created = await Student.create(body);
    return NextResponse.json(created,(body))
  } catch (error: any) {
    return NextResponse.json({ error: "error missing fields"},{status: 400} );
  }
}
