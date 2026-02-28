import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Student from "../../../../models/Student";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  const { id } = await context.params;

  const student = await Student.findById(id);

  if (!Student) {
    return NextResponse.json(
      { error: "student id not found" },
      { status: 404 },
    );
  }

  return NextResponse.json(student);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "invalid student id" },
        { status: 400 },
      );
    }

    const body = await request.json();

    delete body._id;
    delete body.createdAt;
    delete body.updatedAt;

    const updated = await Student.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "student not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({error:"failed to update student infor", datails: String(error?.message ?? error)}, {status: 400})
  }
}
