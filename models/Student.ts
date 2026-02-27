import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema (
    {
      name: {type: String, required: true},
      surname: {type: String, required: true},
      parentName: {type:String, required:true},
      parentNumber: {type:Number, required:true},
      
      
      class: {type: String, required: true},
      grade:{type:Number, required:true},
      studentId: {type: Number, required: true},



    },
    {
     timestamps: true
    }
)

export default mongoose.models.Student || mongoose.model("Student",StudentSchema)