import mongoose, { mongo } from "mongoose";
import Validator from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide your name!"],
    minLength: [3, "Name must containt at least 3 character!"],
    maxLength: [30, "Name cannot exceed 30 character!"],
  },
  email: {
    type: String,
    Validator: [Validator.isEmail, "Please provide a valid email!"],
    require: [true, "please provide your email!"],
  },
  coverLetter: {
    type: String,
    require: [true, "please provide your cover Letter!"],
  },
  phone: {
    type: String,
    require: [true, "please provide your phone number!"],
  },
  addres: {
    type: String,
    require: [true, "please provide your Address!"],
  },
  resume: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    role: {
      type: String,
      enum: ["JobFinder"],
      require: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      require: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
