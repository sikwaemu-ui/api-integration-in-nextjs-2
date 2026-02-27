import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Student from "../../../models/Student";

export async function GET(){
  await connectDB()
   
   const students = await Student.find().sort({createdAt: -1})

  return NextResponse.json(Student)
}