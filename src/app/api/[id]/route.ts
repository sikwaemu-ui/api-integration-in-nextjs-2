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
    return NextResponse.json(
      {
        error: "failed to update student infor",
        datails: String(error?.message ?? error),
      },
      { status: 400 },
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await context.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: " failed to find student id " },
        { status: 404 },
      );
    }

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

    const updated = await Student.findByIdAndUpdate(id, body, {
      new: true,
      overwrite: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: " student not found " },
        { status: 404 },
      );
    }

    return NextResponse.json(updated)

  } catch (error: any) {
    return NextResponse.json(
      { error: "failed to update student " },
      { status: 404 },
    );
  }
}






export async function DELETE(request: Request, context:{params: Promise<{id:string}>}){
try{
  await connectDB()

const {id} = await context.params 

const body = await request.json()


const deleted = await  Student.findByIdAndDelete(id)

if(!deleted){
  return NextResponse.json({
    error:"student not found",
  },{
    status: 404
  })
}

return NextResponse.json(deleted)











}catch(error: any){
return NextResponse.json({error:"failed to delete student"},{status: 404})
}
}