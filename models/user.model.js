import mongoose, { Schema } from "mongoose";

const RegisterSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        index: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "password is required"],
      }
    },
      {
        timestamps: true,
      }
);

export const Registration = mongoose.model("Registeration", RegisterSchema);
